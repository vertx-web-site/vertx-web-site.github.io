const autolinkHeadings = require("rehype-autolink-headings")
const betterShell = require("./rehype-highlight-better-shell")
const highlight = require("rehype-highlight")
const hyphenate = require("./remark-hyphenate")
const smartypants = require("@silvenon/remark-smartypants")
const slug = require("rehype-slug")

const options = {
  remarkPlugins: [hyphenate, smartypants],
  rehypePlugins: [[highlight, {
    languages: {
      "better-shell": betterShell
    }
  }], slug, [autolinkHeadings, {
    properties: { ariaHidden: true, tabIndex: -1, className: "heading-anchor" },
    content: {}
  }]]
}

module.exports = options
