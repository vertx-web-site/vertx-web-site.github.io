import imageSize from "image-size"
import { visit } from "unist-util-visit"

// Automatically determine size of local images. Warn about remote images.
export default function rehypeImageSize() {
  return function (tree, file) {
    visit(tree, "element", node => {
      if (node.tagName !== "img") {
        return
      }

      if (
        node.properties.width === undefined ||
        node.properties.height === undefined
      ) {
        let src = node.properties.src
        if (src.startsWith("/")) {
          let size = imageSize(`public${src}`)
          node.properties.width = size.width
          node.properties.height = size.height
        } else {
          console.warn("Image without size", src, "in", file.path)
        }
      }
    })
  }
}
