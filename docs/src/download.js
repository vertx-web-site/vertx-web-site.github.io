import fetch from "node-fetch"
import fs from "fs/promises"
import fsSync from "fs"
import path from "path"
import stream from "stream"
import util from "util"

const pipeline = util.promisify(stream.pipeline)

const repoUrl = "https://repo1.maven.org/maven2"
const downloadPath = "download"

async function downloadFile(url, dest, version, progressListener) {
  if (fsSync.existsSync(dest)) {
    return
  }

  let res = await fetch(url)
  if (res.status !== 200) {
    throw `Could not download "${url}". Status code: ${res.status}`
  }

  let lastProgress = 0
  let downloaded = 0
  let length = +res.headers.get("content-length")
  progressListener?.start(length, `Download ${version}`)

  let partFile = dest + ".part"
  let outputFile = fsSync.createWriteStream(partFile)

  try {
    await pipeline(res.body,
      stream.Transform({
        transform(chunk, enc, cb) {
          downloaded += chunk.length
          if (downloaded - 1024 * 50 > lastProgress) {
            progressListener?.update(downloaded)
            lastProgress = downloaded
          }
          this.push(chunk)
          cb()
        }
      }),
      outputFile
    )
    outputFile.close()
    progressListener?.update(downloaded)
  } catch (err) {
    try {
      outputFile.close()
    } finally {
      await fs.unlink(partFile)
    }
  } finally {
    await fs.rename(partFile, dest)
  }
}

async function download(version, progressListener) {
  // TODO handle snapshots
  let url = `${repoUrl}/io/vertx/vertx-stack-docs/${version}/vertx-stack-docs-${version}-docs.zip`

  await fs.mkdir(downloadPath, { recursive: true })

  let shaFilePath = path.join(downloadPath, `vertx-stack-docs-${version}-docs.zip.sha1`)
  let zipFilePath = path.join(downloadPath, `vertx-stack-docs-${version}-docs.zip`)

  await downloadFile(`${url}.sha1`, shaFilePath, version, undefined)
  await downloadFile(url, zipFilePath, version, progressListener)
}

export default download
