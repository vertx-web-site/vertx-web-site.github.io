import crypto from "node:crypto"
import fs from "node:fs/promises"
import path from "node:path"

async function getSourceSha(
  version: string,
  downloadPath: string,
): Promise<string> {
  let sourceShaFile = path.join(
    downloadPath,
    `vertx-stack-docs-${version}-docs.zip.sha1`,
  )
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
  artifactVersion: string,
  downloadPath: string,
  compiledPath: string,
  isLatestBugfixVersion: boolean,
): Promise<boolean> {
  if (version === "extra") {
    // always recompile extras
    // TODO is it possible to avoid this?
    return false
  }

  let sourceSha = await getSourceSha(artifactVersion, downloadPath)
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
  artifactVersion: string,
  downloadPath: string,
  compiledPath: string,
  isLatestBugfixVersion: boolean,
) {
  let sourceSha = await getSourceSha(artifactVersion, downloadPath)
  let compiledSha = makeCompiledSha(sourceSha, isLatestBugfixVersion)
  let destShaFile = path.join(compiledPath, version, `${version}.sha1`)
  await fs.writeFile(destShaFile, compiledSha)
}
