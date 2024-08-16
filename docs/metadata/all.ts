import { Docs } from "./types"

export interface LatestRelease {
  version: string
  metadata: Docs
}

function filenameToVersion(filename: string) {
  return filename.substring(2, filename.length - 4)
}

// load all metadata files
const metadataModules = require.context(".", false, /\.tsx$/)

// convert metadata file names to versions
export const versions = metadataModules
  .keys()
  .map(filenameToVersion)
  .sort()
  .reverse()

// read metadata
export const metadata: LatestRelease[] = metadataModules
  .keys()
  .map(m => {
    let version = filenameToVersion(m)
    return { version, metadata: metadataModules(m).default as Docs }
  })
  .sort((a, b) => a.version.localeCompare(b.version))

// get latest release
export let latestRelease: LatestRelease
for (let i = metadata.length - 1; i >= 0; --i) {
  if (!metadata[i].metadata.prerelease) {
    latestRelease = metadata[i]
    break
  }
}
