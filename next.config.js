const addTermFrequency = require("./plugins/remark-add-term-frequency")
const autolinkHeadings = require("rehype-autolink-headings")
const betterShell = require("./plugins/rehype-highlight-better-shell")
const FilterWarningsPlugin = require("webpack-filter-warnings-plugin")
const highlight = require("rehype-highlight")
const hyphenate = require("./plugins/remark-hyphenate")
const optimizedImages = require("next-optimized-images")
const sass = require("@zeit/next-sass")
const smartypants = require("@silvenon/remark-smartypants")
const slug = require("rehype-slug")

const withPlugins = require("next-compose-plugins")

const isProd = process.env.NODE_ENV === "production"

const mdx = require("@next/mdx")({
  options: {
    remarkPlugins: [addTermFrequency, hyphenate, smartypants],
    rehypePlugins: [[highlight, {
      languages: {
        "better-shell": betterShell
      }
    }], slug, [autolinkHeadings, {
      properties: { ariaHidden: true, tabIndex: -1, className: "heading-anchor" },
      content: {}
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
  trailingSlash: true,

  // list pages to export
  exportPathMap() {
    return {
      "/": { page: "/" },
      "/blog": { page: "/blog/[[...slug]]" },
      "/community": { page: "/community" },
      "/docs": { page: "/docs/[[...slug]]" },
      "/faq": { page: "/faq" },
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

    // We can ignore the order of CSS files because we use very strict scoping.
    // There should never be any conflicts in our CSS files.
    config.plugins.push(
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/
      })
    )

    return config
  }
}

module.exports = withPlugins([
  [optimizedImages],
  [sass],
  [mdx]
], config)
