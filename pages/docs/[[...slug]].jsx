import Docs from "../../components/layouts/Docs"
import DocsIndex from "../../components/layouts/DocsIndex"
import VersionContext from "../../components/contexts/VersionContext"
import parse5 from "parse5"
import { useContext, useEffect } from "react"

// read docs metadata containing information about documentation categories
// and entries of all Vert.x versions
const metadataModules = require.context("../../docs/metadata", false, /\.jsx$/)
const metadata = metadataModules.keys().map(m => {
  let version = m.substring(2, m.length - 4)
  return { version, metadata: metadataModules(m).default }
}).sort((a, b) => a.version.localeCompare(b.version))

const extractedDocsPath = "docs/extracted"

let asciidoctor
let cache = {}

async function readDirRecursive(dir, fs, path, result = []) {
  let files = await fs.readdir(dir)
  for (let f of files) {
    let absolute = path.join(dir, f)
    if ((await fs.stat(absolute)).isDirectory()) {
      if (f !== "apidocs" && f !== "jsdoc" && f !== "kdoc" && f !== "scaladocs") {
        await readDirRecursive(absolute, fs, path, result)
      }
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

  let paths = []

  // catch versions
  for (let m of metadata) {
    paths.push({
      params: {
        slug: [m.version]
      }
    })
  }

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
  for (let f of files) {
    let m = f.match(new RegExp(`${extractedDocsPath}/(.+)index.adoc`))
    if (m) {
      let slug = m[1].split("/").slice(0, -1)
      if (slug.length > 1) { // don't include index.adoc in parent directory
        paths.push({ params: { slug } })
      }
    }
  }

  // add index page
  paths.push({ params: { slug: [] } })

  return {
    paths,
    fallback: false
  }
}

async function compileAsciiDoc(filename) {
  const cacache = require("cacache")
  const crypto = require("crypto")
  const fs = require("fs").promises

  const cachePath = "./.cache/docs"

  const asciidoctorOptions = {
    safe: "unsafe",
    attributes: {
      "source-highlighter": "highlightjs-ext",
      "showtitle": true,
      "toc": "left",
      "sectanchors": true
    }
  }

  let source = await fs.readFile(filename, "utf-8")
  let cacheKey = JSON.stringify({
    ...asciidoctorOptions,
    filename,
    sha: crypto.createHash("sha256").update(source).digest("hex")
  })

  let info = await cacache.get.info(cachePath, cacheKey)
  if (info !== null) {
    let cachedDocument = await cacache.get(cachePath, cacheKey)
    return JSON.parse(cachedDocument.data.toString("utf-8"))
  } else {
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
    let doc = asciidoctor.load(source, asciidoctorOptions)
    let title = doc.getDocumentTitle()
    let contents = doc.convert()

    let result = {
      title,
      contents
    }

    await cacache.put(cachePath, cacheKey, JSON.stringify(result))

    return result
  }
}

export async function getStaticProps({ params }) {
  const path = require("path")

  // handle index page
  if (!params.slug) {
    return {
      props: {}
    }
  }

  // get version
  let version
  if (metadata.some(m => m.version === params.slug[0])) {
    version = params.slug[0]
  }

  // handle version index
  if (version !== undefined && params.slug.length <= 1) {
    return {
      props: {
        version: params.slug[0]
      }
    }
  }

  // check if generated asciidoc file is in cache
  let slug = params.slug.join("/")
  if (cache[slug]) {
    return cache[slug]
  }

  let { title, contents } = await compileAsciiDoc(path.join(extractedDocsPath, slug, "index.adoc"))

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
      slug,
      title,
      toc,
      contents,
      ...(version && { version })
    }
  }

  return cache[slug]
}

const DocsPage = ({ slug, title, toc, contents, version }) => {
  const setVersion = useContext(VersionContext.Dispatch)

  useEffect(() => {
    setVersion({ version })
  }, [setVersion, version])

  let m
  if (version !== undefined) {
    m = metadata.find(m => m.version === version)
  } else {
    m = metadata[metadata.length - 1]
  }

  if (contents === undefined) {
    return <DocsIndex metadata={m} version={version} />
  } else {
    let slugWithSlash = slug
    if (!slug.endsWith("/")) {
      slugWithSlash += "/"
    }
    let sm = m.metadata.entries.find(e => {
      let href = e.href
      if (href.startsWith("/")) {
        href = href.substring(1)
      }
      return slugWithSlash.endsWith(href)
    })
    if (sm === undefined) {
      sm = { name: title }
    }
    return <Docs metadata={sm} toc={toc} contents={contents} />
  }
}

export default DocsPage
