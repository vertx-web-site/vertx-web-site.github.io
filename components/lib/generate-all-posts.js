import markdownString from "./markdown-string.js"
import slugFromFilename from "./post-slug.js"
import chokidar from "chokidar"
import fs from "fs"
import path from "path"
import { remark } from "remark"
import remarkExtractFrontmatter from "remark-extract-frontmatter"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdx from "remark-mdx"
import yaml from "yaml"

const POSTS_DIR = "./blog"

const FILE_CACHE = new Map()

export function compileFile(filename, remarkPlugins = []) {
  let contents = fs.readFileSync(path.join(POSTS_DIR, filename), {
    encoding: "utf-8",
  })

  let parser = remark()
    .use(remarkMdx)
    .use(remarkFrontmatter)
    .use(remarkExtractFrontmatter, { yaml: yaml.parse })

  for (let p of remarkPlugins) {
    parser = parser.use(p)
  }

  let file = parser.processSync(contents)

  let { date, slug } = slugFromFilename(filename)

  let meta = {
    title: file.data.title,
    description: file.data.description,
    category: file.data.category,
    authors: file.data.authors,
    date,
    filename: `/blog/${path.parse(filename).name}`,
    slug,
    summaryHtml: markdownString(file.data.summary),
  }

  return { file, meta }
}

function addFile(filename) {
  let { meta } = compileFile(filename)
  FILE_CACHE.set(filename, meta)
}

function removeFile(filename) {
  FILE_CACHE.delete(filename)
}

function generateJSON() {
  let allPosts = [...FILE_CACHE.values()]
  allPosts.sort((a, b) => b.date.localeCompare(a.date))
  fs.mkdirSync(path.join(".generated"), { recursive: true })
  fs.writeFileSync(
    path.join(".generated", "allposts.json"),
    JSON.stringify(allPosts),
  )
}

function generateAllPosts() {
  let start = +new Date()

  let postFiles = fs.readdirSync(POSTS_DIR)
  for (let postFile of postFiles) {
    addFile(postFile)
  }

  generateJSON()

  console.log("Generating all posts index took", +new Date() - start, "ms")

  if (process.env.NODE_ENV === "development") {
    chokidar
      .watch(".", { ignoreInitial: true, cwd: POSTS_DIR })
      .on("all", (event, path) => {
        if (event === "add" || event === "change") {
          addFile(path)
          generateJSON()
        } else if (event === "unlink") {
          removeFile(path)
          generateJSON()
        }
      })
  }
}

export default generateAllPosts
