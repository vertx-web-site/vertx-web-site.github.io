const fs = require("fs/promises")
const path = require("path")
const crypto = require("crypto")

async function getSourceSha(version, downloadPath) {
  let sourceShaFile = path.join(downloadPath, `vertx-stack-docs-${version}-docs.zip.sha1`)
  let sourceSha = await fs.readFile(sourceShaFile, "utf-8")
  return sourceSha
}

function makeCompiledSha(sourceSha, isLatestBugfixVersion) {
  let o = { sourceSha, isLatestBugfixVersion, version: 3 }
  let s = JSON.stringify(o)
  return crypto.createHash("sha256").update(s).digest("base64")
}

async function isCompiled(version, artifactVersion, downloadPath, compiledPath,
    isLatestBugfixVersion) {
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

async function writeCompiledSha(version, artifactVersion, downloadPath,
  compiledPath, isLatestBugfixVersion) {
  let sourceSha = await getSourceSha(artifactVersion, downloadPath)
  let compiledSha = makeCompiledSha(sourceSha, isLatestBugfixVersion)
  let destShaFile = path.join(compiledPath, version, `${version}.sha1`)
  await fs.writeFile(destShaFile, compiledSha)
}

module.exports = {
  isCompiled,
  writeCompiledSha
}
