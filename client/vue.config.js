var path = require("path");

// vue.config.js
module.exports = {
  devServer: {
    headers: { "Access-Control-Allow-Origin": "*" },
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: "127.0.0.1",
    port: 8080,
    watchOptions: {
      poll: true
    },
    disableHostCheck: false,
    proxy: {
      "/v1": {
        target: "http://127.0.0.1:4200"
      }
    },
    stats: {
      colors: true
    }
  }
};
