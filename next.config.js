const betterShell = require("./plugins/rehype-highlight-better-shell")
const highlight = require("rehype-highlight")
const hyphenate = require("./plugins/remark-hyphenate")
const optimizedImages = require("next-optimized-images")
const sass = require("@zeit/next-sass")
const smartypants = require("@silvenon/remark-smartypants")

const withPlugins = require("next-compose-plugins")

const isProd = process.env.NODE_ENV === "production"

const mdx = require("@next/mdx")({
  options: {
    remarkPlugins: [hyphenate, smartypants],
    rehypePlugins: [[highlight, {
      languages: {
        "better-shell": betterShell
      }
    }]]
  }
})

const config = {
  env: {
    // URL to the website. MUST NOT end with a slash.
    baseUrl: isProd ? "https://vertx-web-site.github.io" : "http://localhost:3000"
  },

  // also render markdown pages
  pageExtensions: ["js", "jsx", "md", "mdx"],

  // create a folder for each page
  exportTrailingSlash: true,

  // list pages to export
  exportPathMap() {
    return {
      "/": { page: "/" },
      "/blog": { page: "/blog" },
      "/docs": { page: "/docs" },
      "/ecosystem": { page: "/ecosystem" },
      "/get-started": { page: "/get-started" },
      "/introduction-to-vertx-and-reactive": { page: "/introduction-to-vertx-and-reactive" }
    }
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.module.rules.push({
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: [/node_modules/, /\.next/, /out/],
        enforce: "pre",
        options: {
          emitWarning: true
        }
      })
    }
    return config
  }
}

module.exports = withPlugins([
  [optimizedImages],
  [sass],
  [mdx]
], config)
