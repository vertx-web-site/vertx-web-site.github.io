import { visit } from "unist-util-visit"

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

export class AutoBasePath {
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

          // replace original link in parent with new node
          parent.children[index] = {
            type: "mdxJsxFlowElement",
            name: "Link",
            attributes: [{
              type: "mdxJsxAttribute",
              name: "href",
              value: url
            }, {
              type: "mdxJsxAttribute",
              name: "passHref",
              value: null
            }],
            children: [node]
          }

          return [visit.SKIP, index + 1]
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
