const POSTS = require.context("../../blog", false, /\.mdx$/).keys().map(p => {
  let e = p.match(/.\/([0-9]+-[0-9]+-[0-9]+)-(.*)\.mdx/)
  if (e[2].indexOf(".") >= 0) {
    throw `Invalid blog post filename: ${p}. Dots '.' are not allowed.`
  }
  return {
    filename: p.substring(2),
    date: e[1],
    slug: e[2]
  }
})

POSTS.sort((a, b) => new Date(b.date) - new Date(a.date))

export default POSTS
