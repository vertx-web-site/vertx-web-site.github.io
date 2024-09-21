import { Artifact, GitHubArtifact, MavenArtifact } from "./artifact"
import { artifactToZipFile } from "./util"
import crypto from "node:crypto"
import fsSync from "node:fs"
import fs from "node:fs/promises"
import xml2js from "xml2js"

const repoUrl = "https://repo1.maven.org/maven2"
const downloadPath = "download"

async function downloadFile(
  url: string,
  dest: string,
  displayName: string,
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
  progressListener?.start(length, `Download ${displayName}`)

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

async function getSnapshotUrl(artifactName: string, version: string) {
  let baseUrl = `https://s01.oss.sonatype.org/content/repositories/snapshots/io/vertx/${artifactName}/${version}/`
  let metadataUrl = `${baseUrl}maven-metadata.xml`

  let res = await fetch(metadataUrl)
  if (res.status !== 200) {
    throw `Could not download "${metadataUrl}". Status code: ${res.status}`
  }

  let metadataText = await res.text()
  let metadata = await xml2js.parseStringPromise(metadataText)

  return `${baseUrl}${artifactName}-${metadata.metadata.versioning[0].snapshotVersions[0].snapshotVersion[0].value[0]}-docs.zip`
}

async function download(
  artifact: Artifact,
  progressListener: ProgressListener,
) {
  switch (artifact.type) {
    case "maven":
      await downloadMaven(artifact, progressListener)
      break
    case "github":
      await downloadGitHub(artifact, progressListener)
      break
  }
}

async function downloadMaven(
  artifact: MavenArtifact,
  progressListener: ProgressListener,
) {
  let url
  if (artifact.version.endsWith("-SNAPSHOT")) {
    url = await getSnapshotUrl(artifact.name, artifact.version)
  } else {
    url = `${repoUrl}/io/vertx/${artifact.name}/${artifact.version}/${artifact.name}-${artifact.version}-docs.zip`
  }

  await fs.mkdir(downloadPath, { recursive: true })

  let zipFilePath = artifactToZipFile(artifact, downloadPath)
  let shaFilePath = `${zipFilePath}.sha1`

  await downloadFile(`${url}.sha1`, shaFilePath, artifact.version, undefined)
  await downloadFile(url, zipFilePath, artifact.version, progressListener)
}

async function downloadGitHub(
  artifact: GitHubArtifact,
  progressListener: ProgressListener,
) {
  let url = `https://github.com/${artifact.owner}/${artifact.repo}/archive/refs/heads/${artifact.ref}.zip`

  await fs.mkdir(downloadPath, { recursive: true })

  let zipFilePath = artifactToZipFile(artifact, downloadPath)
  let shaFilePath = `${zipFilePath}.sha1`

  await downloadFile(
    url,
    zipFilePath,
    `${artifact.owner}/${artifact.repo}`,
    progressListener,
  )

  let data = await fs.readFile(zipFilePath)
  let sha1 = crypto.createHash("sha1").update(data).digest("hex")
  await fs.writeFile(shaFilePath, sha1)
}

export default download
