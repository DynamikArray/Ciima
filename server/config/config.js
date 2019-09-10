require("dotenv").config();

const config = {
  host: "localhost",
  port: process.env.PORT,
  name: process.env.APP_NAME || "Api",
  logger: true
};

module.exports = config;
