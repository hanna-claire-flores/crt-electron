module.exports = {
  entry: "./wrapper/electron-main.js",
  module: {
    rules: [
      {
        test: /native_modules[/\\].+\.node$/,
        use: "node-loader",
      },
      {
        test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
        parser: { amd: false },
        use: {
          loader: "@vercel/webpack-asset-relocator-loader",
          options: {
            outputAssetBase: "native_modules",
          },
        },
      },
    ],
  },
};
