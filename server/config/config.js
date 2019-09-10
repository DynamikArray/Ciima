require("dotenv").config();

const config = {
  host: "localhost",
  port: process.env.PORT || 3000,
  name: process.env.APP_NAME || "Api",
  logger: true
};

module.exports = config;
