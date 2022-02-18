import autolinkHeadings from "rehype-autolink-headings"
import betterShell from "./rehype-highlight-better-shell.js"
import highlight from "rehype-highlight"
import hyphenate from "./remark-hyphenate.js"
import smartypants from "@silvenon/remark-smartypants"
import slug from "rehype-slug"

export const mdxOptions = {
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
