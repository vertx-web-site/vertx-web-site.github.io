const visit = require("unist-util-visit")

function shouldBeConverted(node) {
  return node.url.startsWith("http://vertx.io") ||
      node.url.startsWith("https://vertx.io") ||
      node.url.startsWith("/")
}

function makeRelative(url) {
  url = url.replace(/https?:\/\/vertx.io/, "")
  if (url === "") {
    url = "/"
  }
  return url
}

class AutoBasePath {
  constructor(basePath) {
    this.basePath = basePath
  }

  apply() {
    let that = this

    return () => tree => {
      // Wrap <Link> around links. This will automatically set the base path
      // correctly and also correctly use the application's router.
      visit(tree, "link", (node, index, parent) => {
        if (shouldBeConverted(node)) {
          let url = makeRelative(node.url)

          // remove URL from original link. <Link> will replace it with the correct value.
          node.url = ""

          // wrap <Link> around the original link
          let nodes = [{
            type: "jsx",
            value: `<Link href="${url}" passHref={true}>`
          }, node, {
            type: "jsx",
            value: "</Link>"
          }]

          // replace original link in parent by new nodes
          parent.children.splice(index, 1, ...nodes)

          return [visit.SKIP, index + nodes.length]
        }
      })

      // add basePath to image URLs
      visit(tree, "image", (node) => {
        if (shouldBeConverted(node)) {
          let url = makeRelative(node.url)
          node.url = that.basePath + url
        }
      })
    }
  }
}

module.exports = AutoBasePath
