import fsSync from "node:fs"
import fs from "node:fs/promises"
import path from "node:path"
import xml2js from "xml2js"

const repoUrl = "https://repo1.maven.org/maven2"
const downloadPath = "download"

async function downloadFile(
  url: string,
  dest: string,
  version: string,
  progressListener: ProgressListener | undefined,
) {
  if (fsSync.existsSync(dest)) {
    return
  }

  let res = await fetch(url)
  if (res.status !== 200) {
    throw `Could not download "${url}". Status code: ${res.status}`
  }

  let lastProgress = 0
  let downloaded = 0
  let length = +(res.headers.get("content-length") ?? "0")
  progressListener?.start(length, `Download ${version}`)

  let partFile = dest + ".part"
  let outputFile = await fs.open(partFile, "w")

  try {
    let reader = res.body!.getReader()
    let readResult = await reader.read()
    while (!readResult.done) {
      downloaded += readResult.value.length
      if (downloaded - 1024 * 50 > lastProgress) {
        progressListener?.update(downloaded)
        lastProgress = downloaded
      }
      await outputFile.write(readResult.value)
      readResult = await reader.read()
    }
    await outputFile.close()
    progressListener?.update(downloaded)
  } catch (err) {
    try {
      await outputFile.close()
    } finally {
      await fs.unlink(partFile)
    }
  } finally {
    await fs.rename(partFile, dest)
  }
}

async function getSnapshotUrl(version: string) {
  let baseUrl = `https://s01.oss.sonatype.org/content/repositories/snapshots/io/vertx/vertx-stack-docs/${version}/`
  let metadataUrl = `${baseUrl}maven-metadata.xml`

  let res = await fetch(metadataUrl)
  if (res.status !== 200) {
    throw `Could not download "${metadataUrl}". Status code: ${res.status}`
  }

  let metadataText = await res.text()
  let metadata = await xml2js.parseStringPromise(metadataText)

  return `${baseUrl}vertx-stack-docs-${metadata.metadata.versioning[0].snapshotVersions[0].snapshotVersion[0].value[0]}-docs.zip`
}

async function download(version: string, progressListener: ProgressListener) {
  let url
  if (version.endsWith("-SNAPSHOT")) {
    url = await getSnapshotUrl(version)
  } else {
    url = `${repoUrl}/io/vertx/vertx-stack-docs/${version}/vertx-stack-docs-${version}-docs.zip`
  }

  await fs.mkdir(downloadPath, { recursive: true })

  let shaFilePath = path.join(
    downloadPath,
    `vertx-stack-docs-${version}-docs.zip.sha1`,
  )
  let zipFilePath = path.join(
    downloadPath,
    `vertx-stack-docs-${version}-docs.zip`,
  )

  await downloadFile(`${url}.sha1`, shaFilePath, version, undefined)
  await downloadFile(url, zipFilePath, version, progressListener)
}

export default download
