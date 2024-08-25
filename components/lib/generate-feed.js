import { compileFile } from "./generate-all-posts.js"
import { Feed } from "feed"
import fs from "fs"

const POSTS_DIR = "./blog"

function generateFeed() {
  let start = +new Date()

  const feed = new Feed({
    title: "Vert.x",
    description:
      "Vert.x is a tool-kit for building reactive applications on the JVM",
    id: process.env.baseUrl,
    link: process.env.baseUrl,
    language: "en",
    favicon: "https://vertx.io/favicons/favicon.ico",
    generator: "Michel Krämer",
    feedLinks: {
      rss2: "https://vertx.io/feed/rss.xml",
      atom: "https://vertx.io/feed/atom.xml",
      json: "https://vertx.io/feed/feed.json",
    },
  })

  let postFiles = fs.readdirSync(POSTS_DIR)
  for (let postFile of postFiles) {
    let { file, meta } = compileFile(postFile)
    let url = `https://vertx.io/blog/${meta.slug}`
    feed.addItem({
      title: file.data.title,
      id: url,
      link: url,
      description: file.data.description,
      date: new Date(meta.date),
      category: [{ name: file.data.category }],
      author: file.data.authors.map(a => ({
        name: a.name,
        link:
          a.github_id !== undefined
            ? `https://github.com/${a.github_id}`
            : "https://vertx.io",
      })),
    })
  }

  fs.mkdirSync("public/feed", { recursive: true })
  fs.writeFileSync("public/feed/rss.xml", feed.rss2(), "utf-8")
  fs.writeFileSync("public/feed/atom.xml", feed.atom1(), "utf-8")
  fs.writeFileSync("public/feed/feed.json", feed.json1(), "utf-8")

  console.log("Generating feed files took", +new Date() - start, "ms")
}

export default generateFeed
