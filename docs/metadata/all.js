import { compareVersion, parseVersion } from "./helpers"

function filenameToVersion(filename) {
  return filename.substring(2, filename.length - 4)
}

// load all metadata files
const metadataModules = require.context(".", false, /\.jsx$/)

// convert metadata file names to versions
export const versions = metadataModules.keys()
  .map(filenameToVersion)
  .sort()
  .reverse()

// read metadata
export const metadata = metadataModules.keys().map(m => {
  let version = filenameToVersion(m)
  return { version, metadata: metadataModules(m).default }
}).sort((a, b) => {
  let pa = parseVersion(a.version)
  let pb = parseVersion(b.version)
  return compareVersion(pa, pb)
})

// get latest release
export let latestRelease
for (let i = metadata.length - 1; i >= 0; --i) {
  if (!metadata[i].metadata.prerelease) {
    latestRelease = metadata[i]
    break
  }
}
