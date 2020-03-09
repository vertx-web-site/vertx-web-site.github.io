const sass = require("@zeit/next-sass");
const withPlugins = require("next-compose-plugins");

const mdx = require("@next/mdx")();

const config = {
  // also render markdown pages
  pageExtensions: ["js", "jsx", "md", "mdx"],

  // create a folder for each page
  exportTrailingSlash: true,

  // list pages to export
  exportPathMap() {
    return {
      "/": { page: "/" }
    };
  }
};

module.exports = withPlugins([
  [sass],
  [mdx]
], config);
