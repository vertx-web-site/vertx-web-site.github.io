import fs from "fs/promises"
import fsSync from "fs"
import path from "path"
import yauzl from "yauzl"

const downloadPath = "download"
const extractedPath = "extracted"
const publicDocsPath = "../public/docs"

async function extractEntry(zipfile, entry, extractedVersionPath,
    publicDocsVersionPath, apidocsOnly) {
  if (entry.fileName.endsWith("/")) {
    // skip directories
    return
  }

  if (entry.fileName.startsWith("scaladocs/") || entry.fileName.startsWith("yardoc/") ||
      entry.fileName.startsWith("kdoc/")) {
    // skip unnecessary files
    return
  }

  let destPath
  if (entry.fileName.startsWith("apidocs/")) {
    destPath = path.join(publicDocsVersionPath, entry.fileName)
  } else {
    if (apidocsOnly) {
      // skip everything but apidocs
      return
    }
    destPath = path.join(extractedVersionPath, entry.fileName)
  }

  try {
    let stat = await fs.stat(destPath)
    if (stat.size === entry.uncompressedSize && +entry.getLastModDate() === stat.mtimeMs) {
      return
    }
  } catch (e) {
    // file does not exist
  }

  await fs.mkdir(path.dirname(destPath), { recursive: true })

  let writeStream = fsSync.createWriteStream(destPath)
  await new Promise((resolve, reject) => {
    zipfile.openReadStream(entry, (err, readStream) => {
      if (err) {
        reject(err)
        return
      }

      readStream.on("end", function() {
        writeStream.close(_ => {
          resolve()
        })
      })

      readStream.on("error", reject)
      readStream.pipe(writeStream)
    })
  })

  await fs.utimes(destPath, entry.getLastModDate(), entry.getLastModDate())
}

async function extract(version, artifactVersion, progressListener, apidocsOnly = false) {
  let extractedVersionPath = path.join(extractedPath, version)
  let publicDocsVersionPath = path.join(publicDocsPath, version)

  await fs.mkdir(extractedVersionPath, { recursive: true })
  await fs.mkdir(publicDocsVersionPath, { recursive: true })

  await new Promise((resolve, reject) => {
    let zipFilePath = path.join(downloadPath, `vertx-stack-docs-${artifactVersion}-docs.zip`)
    yauzl.open(zipFilePath, { lazyEntries: true }, (err, zipfile) => {
      if (err) {
        reject(err)
        return
      }

      let entriesRead = 0
      progressListener?.start(zipfile.entryCount, `Extract ${version}`)

      zipfile.on("error", reject)
      zipfile.on("end", () => resolve())

      zipfile.on("entry", entry => {
        extractEntry(zipfile, entry, extractedVersionPath, publicDocsVersionPath, apidocsOnly)
          .then(() => {
            entriesRead++
            progressListener?.update(entriesRead)
            zipfile.readEntry()
          })
          .catch(reject)
      })

      zipfile.readEntry()
    })
  })
}

export default extract
