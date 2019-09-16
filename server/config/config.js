let host = "localhost";
if (process.env.NODE_ENV === "production") {
  host = "0.0.0.0";
}

const config = {
  host: host,
  port: process.env.PORT,
  name: process.env.APP_NAME || "Api"
};

const documentation = {
  routePrefix: "/docs",
  swagger: {
    info: {
      version: "1.0.0", //get from package
      title: "Ciima API Documentation",
      description: "Ciima API Endpoints Documentation"
    },
    //schemes: [process.env.options.https ? "https" : "http"],
    consumes: ["application/json"],
    produces: ["application/json"]
  },
  exposeRoute: true
};
module.exports = { config, documentation };
