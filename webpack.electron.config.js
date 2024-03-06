const path = require("path");

module.exports = {
  entry: "./wrapper/main.js",
  module: {
    rules: [
      {
        test: /native_modules[/\\].+\.node$/,
        use: "node-loader",
      },
      // {
      //   test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
      //   parser: { amd: false },
      //   use: {
      //     loader: "@vercel/webpack-asset-relocator-loader",
      //     options: {
      //       outputAssetBase: "native_modules",
      //     },
      //   },
      // },
    ],
  },
};
