require("dotenv").config();

const host = "localhost";
if (process.env.NODE_ENV === "production") {
  host = "0.0.0.0";
}

const config = {
  host: host,
  port: process.env.PORT,
  name: process.env.APP_NAME || "Api",
  logger: true
};

module.exports = config;
