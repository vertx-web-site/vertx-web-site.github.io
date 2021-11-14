const fetch = require("node-fetch").default
const fs = require("fs/promises")
const fsSync = require("fs")
const path = require("path")
const stream = require("stream")
const unzipper = require("unzipper")
const Writer = require("fstream").Writer

async function download(version, progressListener) {
  // TODO handle snapshots
  let url = `https://repo1.maven.org/maven2/io/vertx/vertx-stack-docs/${version}/vertx-stack-docs-${version}-docs.zip`

  let extractedPath = `extracted/${version}`
  let downloadPath = "download"

  await fs.mkdir(extractedPath, { recursive: true })
  await fs.mkdir(downloadPath, { recursive: true })

  let zipFilePath = path.join(downloadPath, `vertx-stack-docs-${version}-docs.zip`)
  let downloadFile = false
  let zipFile
  let length
  let readStream
  try {
    let stat = await fs.stat(zipFilePath)
    length = stat.size
    zipFile = fsSync.createReadStream(zipFilePath)
    readStream = zipFile
  } catch (e) {
    downloadFile = true
    zipFile = await fs.open(zipFilePath, "w")
  }

  let lastProgress = 0
  let downloaded = 0
  if (downloadFile) {
    let res = await fetch(url)
    length = +res.headers.get("content-length")
    readStream = res.body
  }

  progressListener?.start(length)

  try {
    await readStream
      .pipe(stream.Transform({
        transform(chunk, enc, cb) {
          downloaded += chunk.length
          if (downloaded - 1024 * 50 > lastProgress) {
            progressListener?.update(downloaded)
            lastProgress = downloaded
          }
          this.push(chunk)
          if (downloadFile) {
            zipFile.write(chunk).then(() => cb()).catch(cb)
          } else {
            cb()
          }
        }
      }))
      .pipe(unzipper.Parse())
      .on("entry", function (entry) {
        if (entry.type === "Directory") {
          return entry.autodrain
        }

        let destPath = path.join(extractedPath, entry.path)

        return fs.stat(destPath)
          .catch(_ => null)
          .then(stat => {
            if (stat === null ||
                (entry.vars.uncompressedSize > 0 && stat.size !== entry.vars.uncompressedSize) ||
                +stat.mtime !== +entry.vars.lastModifiedDateTime) {
              let writer = Writer({ path: destPath })
              return new Promise((resolve, reject) => {
                entry.pipe(writer)
                  .on("error", reject)
                  .on("close", resolve)
              }).then(() => {
                return fs.utimes(destPath, entry.vars.lastModifiedDateTime,
                  entry.vars.lastModifiedDateTime)
              })
            } else {
              return entry.autodrain()
            }
          })
      })
      .promise()
    await zipFile.close()
    progressListener?.update(downloaded)
  } catch (err) {
    // TODO delete directory
    // TODO delete zip file
    throw err
  }
}

export default download
