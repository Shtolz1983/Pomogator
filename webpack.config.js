//Dotenv
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// PATH
const path = require("path");
const SRC_DIR = path.resolve(__dirname, "./");
const DIST_DIR = path.resolve(__dirname, "./dist");

module.exports = {
  entry: SRC_DIR + "/src/controller.js",
  output: {
    path: DIST_DIR,
    filename: "index_bundle.js",
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      title: "Pomogator",
      template: SRC_DIR + "/index.html",
    }),
  ],
  mode: "development",
};
