import { compileFile } from "./generate-all-posts.js"
import slugFromFilename from "./post-slug.js"
import remarkTermFrequency from "./remark-termfrequency.js"
import chokidar from "chokidar"
import fs from "fs"
import natural from "natural"
import path from "path"

const POSTS_DIR = "./blog"

const FILE_CACHE = new Map()

function addFile(filename) {
  let { file, meta } = compileFile(filename, [remarkTermFrequency])
  FILE_CACHE.set(filename, { meta, tf: file.data.termFrequency })
}

function removeFile(filename) {
  FILE_CACHE.delete(filename)
  let { slug } = slugFromFilename(filename)
  fs.unlinkSync(".generated", "relatedposts", `${slug}.json`)
}

function generateRelatedPostJSON() {
  let allPosts = [...FILE_CACHE.values()]
  let sortedPosts = [...allPosts]
  sortedPosts.sort((a, b) => a.meta.date.localeCompare(b.meta.date))

  let tfidf = new natural.TfIdf()
  for (let p of allPosts) {
    let doc = {}
    p.tf.forEach(t => (doc[t.term] = t.tf))
    tfidf.addDocument(doc)
  }

  fs.mkdirSync(path.join(".generated", "relatedposts"), { recursive: true })

  for (let p of allPosts) {
    // get next and previous posts
    let sortedCurrentPostIndex = sortedPosts.findIndex(
      o => o.meta.slug === p.meta.slug,
    )
    let prevPost =
      sortedCurrentPostIndex > 0
        ? sortedPosts[sortedCurrentPostIndex - 1].meta
        : undefined
    let nextPost =
      sortedCurrentPostIndex < sortedPosts.length - 1
        ? sortedPosts[sortedCurrentPostIndex + 1].meta
        : undefined

    // calculate related posts based on tf-idf
    let relatedPosts = tfidf
      .tfidfs(p.tf.map(t => t.term))
      .map((f, i) => ({ ...allPosts[i], f }))
      .filter(o => o.meta.slug !== p.meta.slug) // remove current post
      .filter(
        o => o.meta.slug !== prevPost?.slug && o.meta.slug !== nextPost?.slug,
      ) // remove previous and next post
      .sort((a, b) => b.meta.date.localeCompare(a.meta.date)) // sort by date (newest first)
      .sort((a, b) => b.f - a.f) // sort by tf-idf (best matches first)
      .slice(0, 3) // select best three matches
      .map(o => o.meta) // only keep metadata

    fs.writeFileSync(
      path.join(".generated", "relatedposts", `${p.meta.slug}.json`),
      JSON.stringify({ relatedPosts, prevPost, nextPost }),
    )
  }
}

function initialize() {
  let start = +new Date()

  let postFiles = fs.readdirSync(POSTS_DIR)

  // parse all posts and get date and most frequent terms
  for (let postFile of postFiles) {
    addFile(postFile)
  }

  // initialize tf-idf
  let startReset = +new Date()
  generateRelatedPostJSON()

  console.log(
    "Calculating tf-idf of all blog posts took",
    +new Date() - start,
    "ms (including",
    +new Date() - startReset,
    "ms for generating JSON)",
  )
}

function generateAllPosts() {
  initialize()

  if (process.env.NODE_ENV === "development") {
    chokidar
      .watch(".", { ignoreInitial: true, cwd: POSTS_DIR })
      .on("all", (event, path) => {
        if (event === "add" || event === "change") {
          addFile(path)
          generateRelatedPostJSON()
        } else if (event === "unlink") {
          removeFile(path)
          generateRelatedPostJSON()
        }
      })
  }
}

export default generateAllPosts
