const path = require("path")
const webpack = require("webpack")

module.exports = {
  target: "node",
  mode: "development",
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
}
