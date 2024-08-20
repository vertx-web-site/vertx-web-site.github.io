import * as cheerio from "cheerio"
import { versions } from "../../docs/metadata/all"
import { filterLatestBugfixVersions } from "../../docs/metadata/helpers"
import fg from "fast-glob"
import fs from "fs/promises"
import { convert } from "html-to-text"
import os from "os"
import pMap from "p-map"
import path from "path"

interface Entry {
  slug: string
  body: string
}

function nodeToString($node: cheerio.Cheerio<cheerio.Element>) {
  let text = convert($node.html()!, {
    wordwrap: false,
    selectors: [
      { selector: "a", options: { ignoreHref: true } },
      { selector: "img", format: "skip" },
      {
        selector: "dt",
        format: "inlineSurround",
        options: {
          suffix: ": ",
        },
      },
      {
        selector: "dd",
        format: "inlineSurround",
        options: {
          suffix: "\n",
        },
      },
      { selector: "pre", format: "skip" },
      { selector: "td", format: "inlineSurround", options: { suffix: " " } },
      {
        selector: "ul",
        format: "unorderedList",
        options: { itemPrefix: "• " },
      },
    ],
  })

  // cleanup
  text = text.replaceAll(/\r/gm, "").replaceAll(/^\n+/gm, "")

  return text
}

async function main() {
  let filteredVersions = filterLatestBugfixVersions(versions)

  await pMap(
    filteredVersions,
    async v => {
      console.log(`Scraping documentation of version ${v} ...`)
      return scrapeVersion(v)
    },
    { concurrency: Math.max(1, os.cpus().length / 2) },
  )
}

async function scrapeVersion(version: string) {
  // TODO only scrape what's necessary by looking into `metadata`
  let files = await fg.glob([
    `../out/docs/${version}/**/*.html`,
    `!../out/docs/${version}/**/apidocs/**`,
  ])

  let result: Entry[] = []
  for (let f of files) {
    let content = await fs.readFile(f, "utf8")
    let $ = cheerio.load(content)
    let $main = $("main").first()

    $main.find("h1").remove()

    let $sections = $main.find("div[class='sect1'],div[class='sect2']")

    let pageSlug = path.dirname(f).substring(`../out/docs/${version}/`.length)

    // convert sections first
    $sections.each((i, el) => {
      let $n = $(el)
      let id
      if ($n.attr("class") === "sect1") {
        let h = $n.find("h2").first()
        id = h.attr("id")!
        h.remove()
      } else {
        let h = $n.find("h3").first()
        id = h.attr("id")!
        h.remove()
      }
      let s = nodeToString($n)
      result.push({
        slug: `${pageSlug}#${id}`,
        body: s,
      })
    })

    // remove all sections
    $sections.remove()

    // now convert page
    let s = nodeToString($main)
    result.push({
      slug: pageSlug,
      body: s,
    })
  }

  for (let dest of ["out", "public"]) {
    await fs.mkdir(`../${dest}/docs/${version}`, { recursive: true })
    await fs.writeFile(
      `../${dest}/docs/${version}/index.json`,
      JSON.stringify(result),
    )
  }
}

main().catch(console.error)
