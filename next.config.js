const optimizedImages = require("next-optimized-images")
const mdxOptions = require("./components/lib/mdx-options")

const withPlugins = require("next-compose-plugins")

const isProd = process.env.NODE_ENV === "production"

const mdx = require("@next/mdx")({
  options: mdxOptions
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
      "/materials": { page: "/materials" },
      "/translation": { page: "/translation" }
    }
  },

  webpack: (config, { dev, defaultLoaders }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        defaultLoaders.babel,
        {
          loader: require("styled-jsx/webpack").loader,
          options: {
            type: (fileName, options) => options.query.type || "scoped"
          }
        }
      ]
    })

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
  [mdx]
], config)
