const path = require("path")
const webpack = require("webpack")

module.exports = {
  target: "node",
  mode: "production",
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, "../.cache/scraper/webpack"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  node: {
    __filename: true,
    __dirname: true,
  },
  entry: {
    // compile main module and web worker separately (i.e. create two different
    // output modules)
    main: path.resolve(__dirname, "./src/index.ts"),
    worker: path.resolve(__dirname, "./src/worker.ts"),
  },
  output: {
    // this is required so the main module and the web worker get different
    // output names
    filename: "[name].js",

    // Output web worker as commonjs module and export the `default` variable
    // This allows it to be loaded by Piscine as a web worker (with a top-level
    // entry function)
    library: {
      type: "commonjs2",
      export: "default",
    },
  },
}
