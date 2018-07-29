const path = require("path");

module.exports = {
  entry: {
    one: "./public/js/controller.js"
  },
  output: {
    path: path.resolve(__dirname, "public/js/bundles"),
    filename: "[name].bundle.js"
  },
  mode: "development"
};
