const hyphenopoly = require("hyphenopoly");
const visit = require("unist-util-visit-parents");

const hyphenateText = hyphenopoly.config({
  "require": ["en-us"],
  "hyphen": "\u00ad",
  "exceptions": {
    "en-us": "plug-in"
  },
  "sync": true
});

module.exports = () => (tree, file) => {
  visit(tree, "text", (node, ancestors) => {
    if (node.value) {
      if (ancestors.findIndex(e => e.type === "heading") == -1) {
        node.value = hyphenateText(node.value);
        while (node.value.substr(-3).indexOf("\u00ad") >= 0) {
          node.value = node.value.substring(0, node.value.length - 3) +
              node.value.substr(-3).replace("\u00ad", "");
        }
      }
    }
  });
};
