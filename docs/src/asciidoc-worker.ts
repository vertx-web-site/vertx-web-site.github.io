import * as entities from "entities"
import { Artifact } from "./artifact"
import { createHighlighter } from "./highlighter"
import asciidoctor, { Section } from "asciidoctor"
import fg from "fast-glob"
import fsSync from "fs"
import fs from "fs/promises"
import path from "path"
import { stripHtml } from "string-strip-html"
import { MessagePort } from "worker_threads"

const { isCompiled, writeCompiledSha } = require("./util")

const compiledPath = "compiled"
const downloadPath = "download"

interface TocElement {
  id: string
  title: string
  children?: TocElement[]
}

function parseToc2(sections: Section[], depth: number): TocElement[] {
  let result: TocElement[] = []
  for (let s of sections) {
    let t: TocElement = {
      id: `#${s.getId()}`,
      title: stripHtml(entities.decode(s.getTitle() ?? s.getId())).result,
    }
    if (depth > 1 && s.getSections().length > 0) {
      t.children = parseToc2(s.getSections(), depth - 1)
    }
    result.push(t)
  }
  return result
}

async function workerMain({
  version,
  artifact,
  imagesDir,
  isLatestBugfixVersion,
  progressPort,
}: {
  version: string
  artifact: Artifact
  imagesDir: string | undefined
  isLatestBugfixVersion: boolean
  progressPort: MessagePort
}) {
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
      "!toc": true, // force disable table of contents
      sectanchors: true,
      imagesdir: imagesDir,

      // TODO only needed for the migration guides
      VertX: "Vert.x",
      v3x: "3.x",
      v4: "4",
      v4x: "4.x",
      v5: "5",
    },
    catalog_assets: true, // collect all images, so we can call doc.getImages()
  }

  let extractedPath = `extracted/${version}`
  let destVersionPath = path.join(compiledPath, version)
  await fs.mkdir(destVersionPath, { recursive: true })

  let files = await fg(
    ["**/index.adoc", "!**/apidocs", "!**/js", "!**/ruby", "!**/scala"],
    {
      cwd: extractedPath,
    },
  )
  let i = 0
  let lastProgress = 0
  for (let rf of files) {
    let f = path.join(extractedPath, rf)

    // render page (use loadFile so `include` directives work correctly)
    let doc = adoc.loadFile(f, asciidoctorOptions)
    let title = doc.getDocumentTitle()
    let images = doc.getImages()
    let contents = doc.convert()

    let toc = parseToc2(doc.getSections(), 2)

    let filename = f.substring(extractedPath.length + 1)
    let destFile = path.join(
      destVersionPath,
      filename.replace(/\.adoc$/, ".html"),
    )
    let destFileToc = path.join(
      destVersionPath,
      filename.replace(/\.adoc$/, ".toc.json"),
    )
    await fs.mkdir(path.dirname(destFile), { recursive: true })
    await fs.writeFile(destFile, contents)
    await fs.writeFile(
      destFileToc,
      JSON.stringify({
        title,
        toc,
      }),
    )

    // copy images
    for (let image of images) {
      let imageTarget = image.getTarget()
      if (imageTarget.match(/^https?:\/\//)) {
        // external image
        continue
      }
      let imageFileSrc: string
      let imageFileDest: string
      let imagesDirectory = image.getImagesDirectory()
      if (imagesDirectory !== undefined) {
        imageFileSrc = path.normalize(
          path.join(path.dirname(f), imagesDirectory, imageTarget),
        )
        imageFileDest = path.normalize(
          path.join(path.dirname(destFile), imagesDirectory, imageTarget),
        )
      } else {
        imageFileSrc = path.normalize(path.join(path.dirname(f), imageTarget))
        imageFileDest = path.normalize(
          path.join(path.dirname(destFile), imageTarget),
        )
      }
      if (!fsSync.existsSync(imageFileSrc)) {
        throw new Error(
          `${imagesDirectory} image '${imageTarget}' not found in '${f}'. Tried '${imageFileSrc}'.`,
        )
      } else {
        if (!fsSync.existsSync(imageFileDest)) {
          await fs.mkdir(path.dirname(imageFileDest), { recursive: true })
          await fs.copyFile(imageFileSrc, imageFileDest)
        }
      }
    }

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
