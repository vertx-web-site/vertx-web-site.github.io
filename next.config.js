import { mdxOptions } from "./components/lib/mdx-options.js"
import ESLintPlugin from "eslint-webpack-plugin"
import styledJsx from "styled-jsx/webpack.js"
import svgToMiniDataURI from "mini-svg-data-uri"

const isProd = process.env.NODE_ENV === "production"

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

const config = {
  env: {
    basePath,
    // URL to the website. MUST NOT end with a slash.
    baseUrl: isProd ? `https://vertx.io${basePath}` : `http://localhost:3000${basePath}`,
    buildDate: new Date().toISOString()
  },

  // also render markdown pages
  pageExtensions: ["js", "jsx", "md", "mdx"],

  // create a folder for each page
  trailingSlash: true,

  // opt-in to using SWC for minifying JavaScript
  // (does not work with the docs search panel yet!)
  // swcMinify: true,

  // configure base path
  basePath,
  assetPrefix: basePath,

  eslint: {
    dirs: ["components", "pages", "docs/metadata"]
  },

  images: {
    // make build compatible with next-optimized-images
    disableStaticImages: true
  },

  // list pages to export
  exportPathMap() {
    return {
      "/": { page: "/" },
      "/blog": { page: "/blog/[[...slug]]" },
      "/channels": { page: "/channels" },
      "/community": { page: "/community" },
      "/docs": { page: "/docs/[[...slug]]" },
      "/download": { page: "/download" },
      "/faq": { page: "/faq" },
      "/get-started": { page: "/get-started" },
      "/introduction-to-vertx-and-reactive": { page: "/introduction-to-vertx-and-reactive" },
      "/materials": { page: "/materials" }
    }
  },

  webpack: (config, { dev, defaultLoaders }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        defaultLoaders.babel,
        {
          loader: styledJsx.loader,
          options: {
            type: (fileName, options) => options.query.type || "scoped"
          }
        },
        "sass-loader"
      ]
    })

    config.module.rules.push({
      test: /\.(gif|png|jpe?g)$/i,
      type: "asset",
      use: "image-webpack-loader"
    })

    config.module.rules.push({
      test: /\.svg$/i,
      type: "asset",
      use: "image-webpack-loader",
      generator: {
        dataUrl: content => {
          content = content.toString()
          return svgToMiniDataURI(content)
        }
      }
    })

    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: mdxOptions
        }
      ]
    })

    if (dev) {
      config.plugins.push(new ESLintPlugin({
        extensions: ["js", "jsx"]
      }))
    }

    return config
  }
}

export default config
