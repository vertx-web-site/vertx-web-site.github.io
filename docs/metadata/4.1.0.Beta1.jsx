import { clone } from "./helpers"
import oldDocs from "./4.0.3"

const docs = clone(oldDocs)

// Mark this version as a prerelease. Prereleases can be selected manually
// from the dropdown menu on the docs page but the default entry is still
// the latest GA release.
docs.prerelease = true

export default docs
