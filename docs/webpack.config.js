const webpack = require("webpack")

module.exports = {
  target: "node",
  mode: "development",
  cache: {
    type: "filesystem"
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: { loader: "babel-loader" }
    }]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [
    new webpack.ProvidePlugin({
       "React": "react"
    })
  ],
  node: {
    __filename: true,
    __dirname: true
  }
}
