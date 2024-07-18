const path = require("path")

export function slash(p) {
  if (path.sep === "\\") {
    return p.replace(/\\/g, "/")
  }
  return p
}
