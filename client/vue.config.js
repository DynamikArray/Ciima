var path = require("path");

// vue.config.js
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "127.0.0.1",
    port: 8080,
    watchOptions: {
      poll: true
    }
  }
};
