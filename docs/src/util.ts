import { Artifact } from "./artifact"
import crypto from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"

async function getSourceSha(
  artifact: Artifact,
  downloadPath: string,
): Promise<string> {
  let sourceShaFile = artifactToZipFile(artifact, downloadPath) + ".sha1"
  let sourceSha = await fs.readFile(sourceShaFile, "utf-8")
  return sourceSha
}

function makeCompiledSha(
  sourceSha: string,
  isLatestBugfixVersion: boolean,
): string {
  let o = { sourceSha, isLatestBugfixVersion, version: 3 }
  let s = JSON.stringify(o)
  return crypto.createHash("sha256").update(s).digest("base64")
}

export async function isCompiled(
  version: string,
  artifact: Artifact,
  downloadPath: string,
  compiledPath: string,
  isLatestBugfixVersion: boolean,
): Promise<boolean> {
  let sourceSha = await getSourceSha(artifact, downloadPath)
  let compiledSha = makeCompiledSha(sourceSha, isLatestBugfixVersion)

  let destShaFile = path.join(compiledPath, version, `${version}.sha1`)
  let destSha
  try {
    destSha = await fs.readFile(destShaFile, "utf-8")
  } catch (e) {
    // there is no sha file, which means the documentation for this version
    // has not been compiled before or compilation was incomplete
  }

  return destSha === compiledSha
}

export async function writeCompiledSha(
  version: string,
  artifact: Artifact,
  downloadPath: string,
  compiledPath: string,
  isLatestBugfixVersion: boolean,
) {
  let sourceSha = await getSourceSha(artifact, downloadPath)
  let compiledSha = makeCompiledSha(sourceSha, isLatestBugfixVersion)
  let destShaFile = path.join(compiledPath, version, `${version}.sha1`)
  await fs.writeFile(destShaFile, compiledSha)
}

export function artifactToZipFile(
  artifact: Artifact,
  downloadPath: string,
): string {
  let zipFilePath: string
  switch (artifact.type) {
    case "maven":
      zipFilePath = path.join(
        downloadPath,
        `${artifact.name}-${artifact.version}-docs.zip`,
      )
      break
    case "github":
      zipFilePath = path.join(
        downloadPath,
        `${artifact.owner}-${artifact.repo}-${artifact.ref}.zip`,
      )
      break
  }
  return zipFilePath
}
