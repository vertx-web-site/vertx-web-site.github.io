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

module.exports = {
  metadata,
  versions
}
