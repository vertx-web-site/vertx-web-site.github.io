// read docs metadata containing information about documentation categories
// and entries of all Vert.x versions
const metadataModules = require.context(".", false, /\.jsx$/)
const metadata = metadataModules.keys().filter(v => v !== "./all.jsx").map(m => {
  let version = m.substring(2, m.length - 4)
  return { version, metadata: metadataModules(m).default }
}).sort((a, b) => a.version.localeCompare(b.version))

// read all versions
const versions = metadataModules.keys()
  .map(m => m.substring(2, m.length - 4))
  .filter(v => v !== "all")
  .sort().reverse()

module.exports = {
  metadata,
  versions
}
