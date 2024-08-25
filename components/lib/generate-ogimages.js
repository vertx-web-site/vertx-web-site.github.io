import dayjs from "dayjs"
import fs from "fs"
import matter from "gray-matter"
import { encode } from "html-entities"
import os from "os"
import path from "path"
import playwright from "playwright"
import asyncPool from "tiny-async-pool"

const POSTS_DIR = "./blog"

function makeHtml({
  roboto400,
  backgroundImage,
  logoImage,
  author,
  githubId,
  title,
  date,
  summary,
}) {
  return `
    <html>
    <head>
    <style>
    @font-face{
      font-family: "MyRoboto";
      src: url("data:application/font-woff2;charset=utf-8;base64,${roboto400}");
      font-weight: 400;
    }

    *, ::before, ::after {
      box-sizing: border-box;
    }

    :root {
      font-family: "MyRoboto", sans-serif;
      text-rendering: geometricPrecision
    }

    body {
      margin: 0;
    }

    #container {
      position: absolute;
      top: 0;
      left: 0;
      width: 1600px;
      height: 836px;
    }

    #background {
      position: absolute;
      top: 0;
      left: 0;
    }

    #content {
      position: absolute;
      top: 0px;
      left: 100px;
      right: 100px;
      bottom: 45px;
      padding-bottom: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-overflow: ellipsis;
    }

    #inner-content {
      flex: 1;
      display: flex;
      gap: 50px;
      align-items: start;
    }

    #description {
      flex: 1;
    }

    #title {
      font-size: 76px;
      font-weight: 600;
      color: #333;
    }

    #subline {
      font-size: 46px;
      margin-top: 46px;
      font-weight: 400;
      opacity: 0.75;
      color: #888;
      display: flex;
      gap: 0.5em;
      justify-content: start;
      align-items: center;
    }

    #avatar {
      border-radius: 100%;
    }

    #summary {
      font-size: 46px;
      margin-top: 46px;
      font-weight: 400;
      line-height: 1.3em;
      color: #666;
    }

    #logo-container {
      position: absolute;
      right: 0;
      bottom: 0px;
    }
    </style>
    </head>
    <body>
      <div id="container">
        <div id="background">
          <img src="data:image/jpeg;base64,${backgroundImage}" width="1600" height="836" />
        </div>
        <div id="content">
          <div id="inner-content">
            <div id="description">
              <div id="title">${title}</div>
              <div id="subline">
                ${
                  author !== undefined
                    ? (githubId !== undefined
                        ? `<div><img id="avatar" src="https://github.com/${githubId}.png?size=52"></div>`
                        : "") +
                      `<div id="author">${author}</div><div>&bullet;</div>`
                    : ""
                }
                <div id="date">${date}</div>
              </div>
              <div id="summary">
                ${summary}
              </div>
            </div>
          </div>
          <div id="logo-container"><img id="logo" src="data:image/svg+xml;base64,${logoImage}" width="220"></div>
        </div>
      </div>
    </body>
    </html>
  `
}

async function generate(
  postFile,
  roboto400,
  backgroundImage,
  logoImage,
  context,
) {
  let source = fs.readFileSync(path.join(POSTS_DIR, postFile), "utf-8")
  let { data } = matter(source)
  let e = postFile.match(/([0-9]+-[0-9]+-[0-9]+)-(.*)\.mdx/)
  let date = e[1]
  let slug = e[2]

  let author = undefined
  if (data.authors?.length === 1) {
    author = data.authors[0]
  }

  let params = {
    roboto400,
    backgroundImage,
    logoImage,
    author:
      author !== undefined
        ? encode(author.name, { mode: "nonAscii" })
        : undefined,
    githubId: author !== undefined ? author.github_id : undefined,
    title: encode(data.title, { mode: "nonAscii" }),
    date: dayjs(date).format("D MMMM YYYY"),
    summary: encode(data.summary, { mode: "nonAscii" }),
  }

  // compile HTML string
  let html = makeHtml(params)

  // check if there is an existing image and if the HTML used to generate it
  // was the same
  let cacheHtmlFile = `.generated/ogimages/${slug}.html`
  let outPath = `public/images/previews/${slug}.jpg`
  try {
    await fs.promises.stat(outPath) // will fail if the file does not exist
    let cachedHtml = await fs.promises.readFile(cacheHtmlFile, {
      encoding: "utf-8",
    })
    if (cachedHtml === html) {
      return
    }
  } catch (e) {
    // cached file could not be read or does not exist. generate a new image.
  }

  console.log(`Generating OpenGraph image for ${slug} ...`)

  // launch browser
  let page = await context.newPage()

  // visit web page
  page.setViewportSize({ width: 1600, height: 836 })
  await page.goto(`data:text/html,${encodeURIComponent(html)}`)

  // create screenshot
  await page.screenshot({
    path: path.resolve("./", outPath),
    type: "jpeg",
    quality: 75,
  })

  // cache HTML
  await fs.promises.writeFile(cacheHtmlFile, html, { encoding: "utf-8" })
}

async function generateRemarkOgImages() {
  if (process.env.NODE_ENV === "development") {
    // disable in development mode
    return
  }

  // read assets
  let roboto400 = fs
    .readFileSync(
      "node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff2",
    )
    .toString("base64")

  let backgroundImage = fs
    .readFileSync("assets/ogimage-background.png")
    .toString("base64")

  let logoImage = fs.readFileSync("assets/logo.svg").toString("base64")

  let start = +new Date()
  let browser = await playwright.chromium.launch()
  let context = await browser.newContext({ deviceScaleFactor: 1 })

  fs.mkdirSync(".generated/ogimages/", { recursive: true })
  fs.mkdirSync("public/images/previews/", { recursive: true })

  let postFiles = fs.readdirSync(POSTS_DIR)
  postFiles = postFiles.filter(f => f.endsWith(".mdx"))
  for await (let _ of asyncPool(os.cpus().length, postFiles, async postFile =>
    generate(postFile, roboto400, backgroundImage, logoImage, context),
  )) {
    // nothing to do here
  }

  // close browser
  await context.close()
  await browser.close()
  console.log(
    `Done generating OpenGraph images after ${+new Date() - start} ms`,
  )
}

export default generateRemarkOgImages
