import autolinkHeadings from "rehype-autolink-headings"
import betterShell from "./rehype-highlight-better-shell.js"
import highlight from "rehype-highlight"
import hyphenate from "./remark-hyphenate.js"
import smartypants from "@silvenon/remark-smartypants"
import slug from "rehype-slug"

import bash from "highlight.js/lib/languages/bash"
import ceylon from "highlight.js/lib/languages/ceylon"
import css from "highlight.js/lib/languages/css"
import gradle from "highlight.js/lib/languages/gradle"
import groovy from "highlight.js/lib/languages/groovy"
import java from "highlight.js/lib/languages/java"
import javascript from "highlight.js/lib/languages/javascript"
import json from "highlight.js/lib/languages/json"
import kotlin from "highlight.js/lib/languages/kotlin"
import ruby from "highlight.js/lib/languages/ruby"
import scala from "highlight.js/lib/languages/scala"
import shell from "highlight.js/lib/languages/shell"
import sql from "highlight.js/lib/languages/sql"
import typescript from "highlight.js/lib/languages/typescript"
import yaml from "highlight.js/lib/languages/yaml"
import xml from "highlight.js/lib/languages/xml"

export const mdxOptions = {
  jsx: true, // Forward JSX elements as is. We need this for styled-jsx.
  remarkPlugins: [hyphenate, smartypants],
  rehypePlugins: [[highlight, {
    languages: {
      bash,
      "better-shell": betterShell,
      ceylon,
      css,
      gradle,
      groovy,
      java,
      javascript,
      json,
      kotlin,
      ruby,
      scala,
      shell,
      sql,
      typescript,
      yaml,
      xml
    }
  }], slug, [autolinkHeadings, {
    properties: { ariaHidden: true, tabIndex: -1, className: "heading-anchor" },
    content: []
  }]]
}
