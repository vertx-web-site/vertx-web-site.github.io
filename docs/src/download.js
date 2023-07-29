import fetch from "node-fetch"
import fs from "fs/promises"
import fsSync from "fs"
import path from "path"
import stream from "stream"
import util from "util"
import xml2js from "xml2js"

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

async function getSnapshotUrl(version) {
  let baseUrl = `https://s01.oss.sonatype.org/content/repositories/snapshots/io/vertx/vertx-stack-docs/${version}/`
  let metadataUrl = `${baseUrl}maven-metadata.xml`

  let res = await fetch(metadataUrl )
  if (res.status !== 200) {
    throw `Could not download "${metadataUrl}". Status code: ${res.status}`
  }

  let metadataText = await res.text()
  let metadata = await xml2js.parseStringPromise(metadataText)

  return `${baseUrl}vertx-stack-docs-${metadata.metadata.versioning[0].snapshotVersions[0].snapshotVersion[0].value[0]}-docs.zip`
}

async function download(version, progressListener) {
  let url
  if (version.endsWith("-SNAPSHOT")) {
    url = await getSnapshotUrl(version)
  } else {
    url = `${repoUrl}/io/vertx/vertx-stack-docs/${version}/vertx-stack-docs-${version}-docs.zip`
  }

  await fs.mkdir(downloadPath, { recursive: true })

  let shaFilePath = path.join(downloadPath, `vertx-stack-docs-${version}-docs.zip.sha1`)
  let zipFilePath = path.join(downloadPath, `vertx-stack-docs-${version}-docs.zip`)

  await downloadFile(`${url}.sha1`, shaFilePath, version, undefined)
  await downloadFile(url, zipFilePath, version, progressListener)
}

export default download
