import Link from "next/link"
import React from "react"
import { createElement } from "react"
import Balancer from "react-wrap-balancer"

const balanceHeadings =
  (type: string) => (props: React.HTMLAttributes<HTMLHeadingElement>) => {
    let newProps = { ...props }
    newProps.children = <Balancer>{props.children}</Balancer>
    return createElement(type, newProps)
  }

function shouldBeConverted(href: string): boolean {
  return (
    href.startsWith("http://vertx.io") ||
    href.startsWith("https://vertx.io") ||
    href.startsWith("/")
  )
}

function makeRelative(href: string): string {
  href = href.replace(/https?:\/\/vertx.io/, "")
  if (href === "") {
    href = "/"
  }
  return href
}

// this file is required to make MDX custom components work with SSR
export function useMDXComponents(components: {
  component: Record<string, React.ComponentType>
}) {
  return {
    // replace markdown links with "next/link"
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
      props.href !== undefined ? (
        <Link href={props.href} {...props} />
      ) : (
        <a {...props} />
      ),

    // automatically add basePath to image source
    img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
      if (props.src !== undefined && shouldBeConverted(props.src)) {
        let src = makeRelative(props.src)
        src = process.env.basePath + props.src
        // eslint-disable-next-line jsx-a11y/alt-text
        return <img {...props} src={src} />
      }
      // eslint-disable-next-line jsx-a11y/alt-text
      return <img {...props} />
    },

    // balance headings
    h2: balanceHeadings("h2"),
    h3: balanceHeadings("h3"),
    h4: balanceHeadings("h4"),

    ...components,
  }
}
