import hyphenopoly from "hyphenopoly"
import visit from "unist-util-visit-parents"

const hyphenateText = hyphenopoly.config({
  "require": ["en-us"],
  "hyphen": "\u00ad",
  "exceptions": {
    "en-us": "plug-in"
  },
  "sync": true
})

function hyphenate() {
  return tree => {
    visit(tree, "text", (node, ancestors) => {
      if (node.value) {
        if (ancestors.findIndex(e => e.type === "heading") === -1) {
          node.value = hyphenateText(node.value)
          while (node.value.substr(-3).indexOf("\u00ad") >= 0) {
            node.value = node.value.substring(0, node.value.length - 3) +
                node.value.substr(-3).replace("\u00ad", "")
          }
        }
      }
    })
  }
}

export default hyphenate
