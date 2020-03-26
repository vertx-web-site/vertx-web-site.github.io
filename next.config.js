const highlight = require("rehype-highlight");
const hyphenate = require("./plugins/remark-hyphenate");
const optimizedImages = require("next-optimized-images");
const sass = require("@zeit/next-sass");
const smartypants = require("@silvenon/remark-smartypants");

const withPlugins = require("next-compose-plugins");

const mdx = require("@next/mdx")({
  options: {
    remarkPlugins: [hyphenate, smartypants],
    rehypePlugins: [highlight]
  }
});

const config = {
  // also render markdown pages
  pageExtensions: ["js", "jsx", "md", "mdx"],

  // create a folder for each page
  exportTrailingSlash: true,

  // list pages to export
  exportPathMap() {
    return {
      "/": { page: "/" },
      "/docs": { page: "/docs" },
      "/get-started": { page: "/get-started" }
    };
  }
};

module.exports = withPlugins([
  [optimizedImages],
  [sass],
  [mdx]
], config);
