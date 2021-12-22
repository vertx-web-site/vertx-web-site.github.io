const fs = require("fs/promises")
const path = require("path")

async function getSourceSha(version, downloadPath) {
  let sourceShaFile = path.join(downloadPath, `vertx-stack-docs-${version}-docs.zip.sha1`)
  let sourceSha = await fs.readFile(sourceShaFile, "utf-8")
  return sourceSha
}

async function isAsciidocCompiled(version, artifactVersion, downloadPath, compiledPath) {
  let sourceSha = await getSourceSha(artifactVersion, downloadPath)

  let destShaFile = path.join(compiledPath, version, `${version}.sha1`)
  let destSha
  try {
    destSha = await fs.readFile(destShaFile, "utf-8")
  } catch (e) {
    // there is no sha file, which means the documentation for this version
    // has not been compiled before or compilation was incomplete
  }

  return destSha === sourceSha
}

module.exports = {
  getSourceSha,
  isAsciidocCompiled
}
