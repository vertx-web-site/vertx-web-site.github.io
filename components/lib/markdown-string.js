import remarkHtml from "remark-html"
import remarkParse from "remark-parse"
import remarkSmartypants from "remark-smartypants"
import { unified } from "unified"

function markdownString(str) {
  let result = unified()
    .use(remarkParse)
    .use(remarkSmartypants)
    .use(remarkHtml)
    .processSync(str)
  return String(result)
}

export default markdownString
