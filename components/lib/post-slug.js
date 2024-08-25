/**
 * Extract date and slug from filename with pattern YYYY-mm-dd-<slug>.mdx
 */
function slugFromFilename(filename) {
  let m
  if ((m = filename.match(/(\d{4}-\d{2}-\d{2})-(.*?)(\.mdx)?$/))) {
    return { date: m[1], slug: m[2] }
  } else {
    throw new Error(`Invalid post filename ${filename}`)
  }
}

export default slugFromFilename
