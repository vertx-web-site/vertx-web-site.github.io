const fetch = require("node-fetch").default
const fs = require("fs/promises")
const path = require("path")
const stream = require("stream")
const unzipper = require("unzipper")

async function download(version, progressListener) {
  // TODO handle snapshots
  let url = `https://repo1.maven.org/maven2/io/vertx/vertx-stack-docs/${version}/vertx-stack-docs-${version}-docs.zip`

  let extractedPath = `extracted/${version}`
  let downloadPath = "download"

  await fs.mkdir(extractedPath, { recursive: true })
  await fs.mkdir(downloadPath, { recursive: true })

  let res = await fetch(url)
  let downloaded = 0
  let length = +res.headers.get("content-length")
  let lastProgress = 0

  progressListener?.start(length)

  // TODO do we really need to save the zip file? Maybe enable this with a flag
  let zipFile = await fs.open(path.join(downloadPath, `vertx-stack-docs-${version}-docs.zip`), "w")

  try {
    await res.body
      .pipe(stream.Transform({
        transform(chunk, enc, cb) {
          downloaded += chunk.length
          if (downloaded - 1024 * 50 > lastProgress) {
            progressListener?.update(downloaded)
            lastProgress = downloaded
          }
          this.push(chunk)
          zipFile.write(chunk).then(() => cb()).catch(cb)
        }
      }))
      .pipe(unzipper.Extract({ path: extractedPath }))
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
