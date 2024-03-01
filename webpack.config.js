const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
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
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[a|c]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
        // use: {
        //   loader: "babel-loader",
        //   options: {
        //     exclude: /node_modules/,
        //     presets: ["@babel/preset-env", "@babel/preset-react"],
        //     plugins: ["@babel/transform-runtime"],
        //   },
        // },
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg)$/,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
    alias: {
      react: path.join(__dirname, "./node_modules/react"),
      assets: path.join(__dirname, "./src/assets"),
      components: path.join(__dirname, "./src/components"),
      features: path.join(__dirname, "./src/features"),
      src: path.join(__dirname, "./src"),
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: "src/assets/images", to: "images" }],
    }),
  ],
};
