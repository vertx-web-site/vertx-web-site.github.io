import * as parse5 from "parse5"
import { Artifact } from "./artifact"
import { createHighlighter } from "./highlighter"
import asciidoctor from "asciidoctor"
import fs from "fs/promises"
import path from "path"
import { MessagePort } from "worker_threads"

const { isCompiled, writeCompiledSha } = require("./util")

const compiledPath = "compiled"
const downloadPath = "download"

interface TocElement {
  id: string
  title: string
  children?: TocElement[]
}

async function readDirRecursive(
  dir: string,
  result: string[] = [],
): Promise<string[]> {
  let files = await fs.readdir(dir)
  for (let f of files) {
    let absolute = path.join(dir, f)
    if ((await fs.stat(absolute)).isDirectory()) {
      if (
        f !== "apidocs" &&
        f !== "jsdoc" &&
        f !== "kdoc" &&
        f !== "scaladocs"
      ) {
        await readDirRecursive(absolute, result)
      }
    } else {
      if (f === "index.adoc") {
        result.push(absolute)
      }
    }
  }
  return result
}

function parseToc(
  toc: parse5.DefaultTreeAdapterMap["element"],
): TocElement[] | undefined {
  let result: TocElement[] = []

  for (let sectionsNode of toc.childNodes) {
    // find node containing sections
    if (
      sectionsNode.nodeName !== "ul" ||
      !sectionsNode.attrs.some(
        a => a.name === "class" && a.value.startsWith("sectlevel"),
      )
    ) {
      continue
    }

    // iterate over all sections
    for (let sectionElement of sectionsNode.childNodes) {
      if (sectionElement.nodeName !== "li") {
        continue
      }

      let id: string | undefined = undefined
      let title: string | undefined = undefined
      for (let c of sectionElement.childNodes) {
        if (c.nodeName === "a") {
          id = c.attrs.find(a => a.name === "href")?.value
          title = c.childNodes
            .map(t => {
              if (t.nodeName === "#text") {
                return (t as parse5.DefaultTreeAdapterMap["textNode"]).value
              }
              return ""
            })
            .join("")
        }
      }

      if (id !== undefined && title !== undefined) {
        let subtoc = parseToc(sectionElement)
        result.push({
          id,
          title,
          children: subtoc,
        })
      }
    }

    break
  }

  if (result.length === 0) {
    return undefined
  }
  return result
}

async function workerMain({
  version,
  artifact,
  isLatestBugfixVersion,
  progressPort,
}: {
  version: string
  artifact: Artifact
  isLatestBugfixVersion: boolean
  progressPort: MessagePort
}) {
  let adoc = asciidoctor()

  // clean up any previously registered extensions
  adoc.Extensions.unregisterAll()

  // register syntax highlighter
  adoc.SyntaxHighlighter.register("shiki", await createHighlighter())

  let memoryLogger = adoc.MemoryLogger.create()
  adoc.LoggerManager.setLogger(memoryLogger)

  const asciidoctorOptions = {
    safe: "unsafe",
    attributes: {
      "source-highlighter": "shiki",
      showtitle: true,
      toc: "left",
      sectanchors: true,
    },
  }

  let extractedPath = `extracted/${version}`
  let destVersionPath = path.join(compiledPath, version)
  await fs.mkdir(destVersionPath, { recursive: true })

  if (
    await isCompiled(
      version,
      artifact,
      downloadPath,
      compiledPath,
      isLatestBugfixVersion,
    )
  ) {
    // documentation has already been compiled earlier
    progressPort.postMessage(100)
    return []
  }

  let files = await readDirRecursive(extractedPath)
  let i = 0
  let lastProgress = 0
  for (let f of files) {
    // render page (use loadFile so `include` directives work correctly)
    let doc = adoc.loadFile(f, asciidoctorOptions)
    let title = doc.getDocumentTitle()
    let contents = doc.convert()

    // parse generated HTML and extract table of contents
    let documentFragment = parse5.parseFragment(contents, {
      sourceCodeLocationInfo: true,
    })
    let toc: TocElement[] | undefined = undefined
    for (let child of documentFragment.childNodes) {
      if (child.nodeName === "div") {
        for (let attr of child.attrs) {
          if (attr.name === "id" && attr.value === "toc") {
            toc = parseToc(child)

            // strip off toc from contents
            contents =
              contents.substring(0, child.sourceCodeLocation!.startOffset) +
              contents.substring(child.sourceCodeLocation!.endOffset)

            break
          }
        }
      }
      if (typeof toc !== "undefined") {
        break
      }
    }
    let filename = f.substring(extractedPath.length + 1)
    let destFile = path.join(
      destVersionPath,
      filename.replace(/\.adoc$/, ".json"),
    )
    let destFileToc = path.join(
      destVersionPath,
      filename.replace(/\.adoc$/, ".toc.json"),
    )
    await fs.mkdir(path.dirname(destFile), { recursive: true })
    await fs.writeFile(
      destFile,
      JSON.stringify({
        title,
        contents,
      }),
    )
    await fs.writeFile(
      destFileToc,
      JSON.stringify({
        toc,
      }),
    )

    ++i
    let progress = Math.round((i * 100) / files.length)
    if (progress !== lastProgress) {
      progressPort.postMessage(progress)
      lastProgress = progress
    }
  }

  // write sha file to indicate that the documentation for this version
  // has been completely compiled
  await writeCompiledSha(
    version,
    artifact,
    downloadPath,
    compiledPath,
    isLatestBugfixVersion,
  )

  if (lastProgress < 100) {
    progressPort.postMessage(100)
  }

  return memoryLogger
    .getMessages()
    .filter(m => m.getSeverity() !== "DEBUG")
    .map(m => `${m.getSeverity()}: ${m.getText()}`)
}

export default workerMain
