function filenameToVersion(filename) {
  return filename.substring(2, filename.length - 4)
}

// load all metadata files
const metadataModules = require.context(".", false, /\.jsx$/)

// convert metadata file names to versions
const versions = metadataModules.keys()
  .map(filenameToVersion)
  .sort()
  .reverse()

// read metadata
const metadata = metadataModules.keys().map(m => {
  let version = filenameToVersion(m)
  return { version, metadata: metadataModules(m).default }
}).sort((a, b) => a.version.localeCompare(b.version))

// get latest release
let latestRelease
for (let i = metadata.length - 1; i >= 0; --i) {
  if (/*!metadata[i].metadata.prerelease*/ metadata[i].version === "4.5.10") {
    latestRelease = metadata[i]
    break
  }
}

module.exports = {
  metadata,
  versions,
  latestRelease
}
