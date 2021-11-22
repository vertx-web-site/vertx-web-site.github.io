const parse5 = require("parse5")
const asciidoctor = require("asciidoctor")()
const highlightJsExt = require("asciidoctor-highlight.js")

// clean up any previously registered extension
asciidoctor.Extensions.unregisterAll()

// register highlight.js extension
highlightJsExt.register(asciidoctor.Extensions)

module.exports = ({ filename, asciidoctorOptions }) => {
  // render page (use loadFile so `include` directives work correctly)
  let doc = asciidoctor.loadFile(filename, asciidoctorOptions)
  let title = doc.getDocumentTitle()
  let contents = doc.convert()

  // parse generated HTML and extract table of contents
  let documentFragment = parse5.parseFragment(contents, { sourceCodeLocationInfo: true })
  let toc = undefined
  for (let child of documentFragment.childNodes) {
    if (child.tagName === "div") {
      for (let attr of child.attrs) {
        if (attr.name === "id" && attr.value === "toc") {
          toc = contents.substring(child.sourceCodeLocation.startOffset,
              child.sourceCodeLocation.endOffset)
          contents = contents.substring(0, child.sourceCodeLocation.startOffset) +
              contents.substring(child.sourceCodeLocation.endOffset)
          break
        }
      }
    }
    if (typeof toc !== "undefined") {
      break
    }
  }
  toc = toc || ""

  return {
    title,
    contents,
    toc
  }
}
