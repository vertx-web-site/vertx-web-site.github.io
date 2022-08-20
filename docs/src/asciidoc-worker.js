const asciidoctor = require("asciidoctor")
const fs = require("fs/promises")
const highlightJsExt = require("asciidoctor-highlight.js")
const parse5 = require("parse5")
const path = require("path")
const { isCompiled, writeCompiledSha } = require("./util")

const compiledPath = "compiled"
const downloadPath = "download"

async function readDirRecursive(dir, result = []) {
  let files = await fs.readdir(dir)
  for (let f of files) {
    let absolute = path.join(dir, f)
    if ((await fs.stat(absolute)).isDirectory()) {
      if (f !== "apidocs" && f !== "jsdoc" && f !== "kdoc" && f !== "scaladocs") {
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

module.exports = async ({ version, artifactVersion, isLatestBugfixVersion, progressPort }) => {
  let adoc = asciidoctor()

  // clean up any previously registered extensions
  adoc.Extensions.unregisterAll()

  // register highlight.js extension
  highlightJsExt.register(adoc.Extensions)

  let memoryLogger = adoc.MemoryLogger.create()
  adoc.LoggerManager.setLogger(memoryLogger)

  const asciidoctorOptions = {
    safe: "unsafe",
    attributes: {
      "source-highlighter": "highlightjs-ext",
      "showtitle": true,
      "toc": "left",
      "sectanchors": true
    }
  }

  let extractedPath = `extracted/${version}`
  let destVersionPath = path.join(compiledPath, version)
  await fs.mkdir(destVersionPath, { recursive: true })

  if (await isCompiled(version, artifactVersion, downloadPath, compiledPath,
      isLatestBugfixVersion)) {
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

    let result = {
      title,
      contents,
      toc
    }
    let destFile = path.join(destVersionPath, f.substring(extractedPath.length + 1)
      .replace(/\.adoc$/, ".json"))
    await fs.mkdir(path.dirname(destFile), { recursive: true })
    await fs.writeFile(destFile, JSON.stringify(result))

    ++i
    let progress = Math.round(i * 100 / files.length)
    if (progress !== lastProgress) {
      progressPort.postMessage(progress)
      lastProgress = progress
    }
  }

  // write sha file to indicate that the documentation for this version
  // has been completely compiled
  await writeCompiledSha(version, artifactVersion, downloadPath, compiledPath,
      isLatestBugfixVersion)

  if (lastProgress < 100) {
    progressPort.postMessage(100)
  }

  return memoryLogger.getMessages()
    .filter(m => m.getSeverity() !== "DEBUG")
    .map(m => `${m.getSeverity()}: ${m.getText()}`)
}
