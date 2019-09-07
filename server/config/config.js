require("dotenv").config();

const config = {
  host: "localhost",
  port: process.env.SERVER_PORT || 3000,
  name: process.env.APP_NAME || "Api",
  logger: true
};

module.exports = config;
