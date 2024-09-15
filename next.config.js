import generateAllPosts from "./components/lib/generate-all-posts.js"
import generateFeed from "./components/lib/generate-feed.js"
import generateRemarkOgImages from "./components/lib/generate-ogimages.js"
import generateRelatedPosts from "./components/lib/generate-related-posts.js"
import rehypeImageSize from "./components/lib/rehype-image-size.js"
import nextBundleAnalyzer from "@next/bundle-analyzer"
import nextMDX from "@next/mdx"
import ESLintPlugin from "eslint-webpack-plugin"
import fs from "fs"
import JSON5 from "json5"
import svgToMiniDataURI from "mini-svg-data-uri"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import remarkSmartypants from "remark-smartypants"
import { createLoader } from "simple-functional-loader"

// generate post metadata once per build and before the build starts
generateAllPosts()
generateFeed()
generateRelatedPosts()
await generateRemarkOgImages()

const withBundleAnalyzer = nextBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

// configure base path based on environment variable `VERTX_WEBSITE_BASEPATH`
const basePath = (() => {
  let p = process.env.VERTX_WEBSITE_BASEPATH || ""
  if (!p.startsWith("/")) {
    p = `/${p}`
  }
  if (p.endsWith("/")) {
    p = p.substring(0, p.length - 1)
  }
  return p
})()

const steepColorTheme = JSON5.parse(
  fs.readFileSync("./components/lib/steep-color-theme.json", "utf8"),
)
const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm, remarkSmartypants],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: steepColorTheme,
          keepBackground: false,
        },
      ],
      rehypeSlug,
      rehypeImageSize,
    ],
  },
})

const config = {
  env: {
    basePath,
    // URL to the website. MUST NOT end with a slash.
    baseUrl:
      process.env.NODE_ENV === "production"
        ? `https://vertx.io${basePath}`
        : `http://localhost:3000${basePath}`,
    buildDate: new Date().toISOString(),
  },

  // also render markdown pages
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // create a folder for each page
  trailingSlash: true,

  // export static website
  output: "export",

  // configure base path
  basePath,
  assetPrefix: basePath === "" ? undefined : basePath,

  eslint: {
    dirs: ["app", "components", "docs/metadata"],
  },

  images: {
    // disable built-in image support
    disableStaticImages: true,
  },

  modularizeImports: {
    lodash: {
      transform: "lodash/{{member}}",
      preventFullImport: true,
    },
    "simple-icons": {
      transform: "simple-icons/icons",
      preventFullImport: true,
      skipDefaultConversion: true,
    },
  },

  webpack: (config, { dev, defaultLoaders }) => {
    config.module.rules.push({
      test: /\.(gif|png|jpe?g)$/i,
      type: "asset",
      use: "image-webpack-loader",
    })

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: /react/,
      use: [
        "react-svg-loader",
        createLoader(function (source) {
          // set font weight
          source = source.replaceAll(
            /font-family:\s*?Roboto-Regular[^";]*;?/g,
            "font-weight:400;$&",
          )

          // remove font-family
          source = source.replaceAll(/font-family="[^"]*"/g, "")
          source = source.replaceAll(/font-family:[^";]*;?/g, "")

          return source
        }),
      ],
    })

    config.module.rules.push({
      test: /\.svg$/i,
      resourceQuery: { not: [/react/] },
      type: "asset",
      use: "image-webpack-loader",
      generator: {
        dataUrl: content => {
          content = content.toString()
          return svgToMiniDataURI(content)
        },
      },
    })

    if (dev) {
      config.plugins.push(
        new ESLintPlugin({
          extensions: ["js", "jsx"],
        }),
      )
    }
    return config
  },
}

export default withBundleAnalyzer(withMDX(config))
