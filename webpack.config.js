//Dotenv
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// PATH
const path = require("path");
const SRC_DIR = path.resolve(__dirname, "./");
const DIST_DIR = path.resolve(__dirname, "./dist");

module.exports = {
  entry: SRC_DIR + "/output.js",
  output: {
    path: DIST_DIR,
    filename: "output_bundle.js",
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
