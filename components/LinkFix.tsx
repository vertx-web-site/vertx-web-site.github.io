import NextLink from "next/link"
import { createElement, forwardRef } from "react"

// This is a workaround for https://github.com/vercel/next.js/issues/53347
// We render a normal <a> tag for external links and a <Link> for internal ones

// TODO remove this once https://github.com/vercel/next.js/issues/53347 is fixed

const Link: typeof NextLink = forwardRef((props, ref) => {
  let href = props.href?.toString()
  if (
    href !== undefined &&
    ((href.match(/https?:\/\//) &&
      !href.startsWith("https://steep-wms.github.io/") &&
      !href.startsWith("http://localhost")) ||
      href.startsWith("mailto:"))
  ) {
    let forbiddenProps = [
      "as",
      "replace",
      "scroll",
      "shallow",
      "passHref",
      "prefetch",
      "locale",
      "legacyBehavior",
      "onMouseEnter",
      "onTouchStart",
    ]

    let keys = Object.keys(props)
    for (let fp of forbiddenProps) {
      if (keys.includes(fp)) {
        throw new Error(
          `Propery '${fp}' is not supported for external link '${href}'`,
        )
      }
    }

    return createElement("a", { ...props, "data-external": "external", ref })
  }

  return <NextLink {...props} ref={ref} />
})

export default Link
