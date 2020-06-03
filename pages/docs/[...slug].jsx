import Layout from "../../components/layouts/Docs"
import parse5 from "parse5"

const extractedDocsPath = "docs/extracted"

let asciidoctor
let cache = {}

async function readDirRecursive(dir, fs, path, result = []) {
  let files = await fs.readdir(dir)
  for (let f of files) {
    let absolute = path.join(dir, f)
    if ((await fs.stat(absolute)).isDirectory()) {
      await readDirRecursive(absolute, fs, path, result)
    } else {
      if (f === "index.adoc") {
        result.push(absolute)
      }
    }
  }
  return result
}

export async function getStaticPaths() {
  const fs = require("fs").promises
  const path = require("path")

  // check if documentation source files exist
  try {
    await fs.access(extractedDocsPath)
  } catch (e) {
    console.warn(
      "\n\n**********************************************************\n" +
          "WARNING: AsciiDoc source files of documentation not found.\n" +
          "Please run `npm run update-docs'\n" +
          "**********************************************************\n")
    return {
      paths: [],
      fallback: false
    }
  }

  let files = await readDirRecursive(extractedDocsPath, fs, path)
  let paths = []
  for (let f of files) {
    let m = f.match(new RegExp(`${extractedDocsPath}/(.+)index.adoc`))
    if (m) {
      let slug = m[1].split("/")
      paths.push({ params: { slug } })
    }
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const path = require("path")

  let slug = params.slug.join("/")
  if (cache[slug]) {
    return cache[slug]
  }

  // load asciidoctor if necessary
  if (typeof asciidoctor === "undefined") {
    asciidoctor = require("asciidoctor")()

    // clean up any previously registered extension
    asciidoctor.Extensions.unregisterAll()

    // register highlight.js extension
    const highlightJsExt = require("asciidoctor-highlight.js")
    highlightJsExt.register(asciidoctor.Extensions)
  }

  // render page
  let doc = asciidoctor.loadFile(path.join(extractedDocsPath, slug, "index.adoc"), {
    safe: "unsafe",
    attributes: {
      "source-highlighter": "highlightjs-ext",
      "showtitle": true,
      "toc": "left"
    }
  })
  let title = doc.getDocumentTitle()
  let contents = doc.convert()

  // parse generated HTML and extract table of contents
  let documentFragment = parse5.parseFragment(contents, { sourceCodeLocationInfo: true })
  let toc = undefined
  for (let child of documentFragment.childNodes) {
    if (child.tagName === "div") {
      for (let attr of child.attrs) {
        if (attr.name === "id" && attr.value === "toc") {
          toc = contents.substring(child.sourceCodeLocation.startOffset,
              child.sourceCodeLocation.endOffset)
          contents = contents.substring(0, child.sourceCodeLocation.startOffset) +
              contents.substring(child.sourceCodeLocation.endOffset)
          break
        }
      }
    }
    if (typeof toc !== "undefined") {
      break
    }
  }

  toc = toc || ""

  cache[slug] = {
    props: {
      title,
      toc,
      contents
    }
  }

  return cache[slug]
}

export default ({ title, toc, contents }) => (
  <Layout meta={{ title }} toc={toc} contents={contents} />
)
