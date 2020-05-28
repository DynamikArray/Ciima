require("dotenv").config();
const path = require("path");
//include logger
const logger = require("../util/winston/winston.js")({ hostname: "Server" });

//include our server config file
const { config, documentation } = require("./config/config");

// Require the framework and instantiate it
const fastify = require("fastify")(config);
const swagger = require("fastify-swagger");
fastify.decorate("winston", logger);

const { linnworks } = require("../util/linnworks/linnworks.js");
fastify.decorate("linnworks", linnworks);

/* Audit Logger Decorator */
const { auditLogger } = require("../util/auditLog/auditLoggerServer.js");
fastify.decorate("auditLogger", auditLogger);

//add morgan
fastify.use(require("morgan")("short", { stream: logger.stream }));
//add our winston/logdna logger to fastify

//proper mysql connection string if prod
let connectionString = process.env.MYSQL_CONN;
if (process.env.NODE_ENV === "production")
  connectionString = process.env.JAWSDB_URL;

//register mystl
fastify.register(require("fastify-mysql"), {
  promise: true,
  connectionString: connectionString,
});

/* Messagning */
fastify.register(require("fastify-rabbit"), {
  url: process.env.CLOUDAMQP_URL,
});

/*Cors */
fastify.register(require("fastify-cors"));

//JWT Auth Handling
fastify.register(require("./plugins/authViaJWT.js"));

//static build dir
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "../client/dist"),
  wildcard: false,
});

//Swagger Docs
fastify.register(swagger, documentation);

//Routes
fastify.register(require("./routes/v1/info"), { prefix: "v1" });
fastify.register(require("./routes/v1/auditLog"), { prefix: "v1" });
fastify.register(require("./routes/v1/titleSearch"), { prefix: "v1" });
fastify.register(require("./routes/v1/issueSearch"), { prefix: "v1" });
fastify.register(require("./routes/v1/ebayCategories"), { prefix: "v1" });
fastify.register(require("./routes/v1/imageFetch"), { prefix: "v1" });

fastify.register(require("./routes/v1/draft"), { prefix: "v1" });
fastify.register(require("./routes/v1/draft/lots"), { prefix: "v1" });

fastify.register(require("./routes/v1/drafts"), { prefix: "v1" });
fastify.register(require("./routes/v1/submitDraft"), { prefix: "v1" });

fastify.register(require("./routes/v1/user"), { prefix: "v1" });
fastify.register(require("./routes/v1/inventory/linnworks"), { prefix: "v1" });
fastify.register(require("./routes/v1/inventory/ebay"), { prefix: "v1" });
//I think this is old code that got rolled into pricing
//fastify.register(require("./routes/v1/ebay/search"), { prefix: "v1" });
//Pricing Service
fastify.register(require("./routes/v1/ebay/search"), { prefix: "v1" });
fastify.register(require("./routes/v1/pricing"), { prefix: "v1" });
//Locations
fastify.register(require("./routes/v1/inventory/location"), { prefix: "v1" });

//catch all route for loading client application
fastify.get("/*", (request, reply) => reply.sendFile("index.html"));

// async start method thing!!!!
const start = async () => {
  fastify.winston.info("Starting Fastify Server");
  //attach linnworks with instance of winston
  await fastify.linnworks.initiliaze(fastify.winston);

  await fastify.listen(config).catch(async (e) => {
    if (process.env.NODE_ENV === "development") console.error(e);
    await fastify.winston.error(`${JSON.stringify(e.message)}`);
  }); //end catch;

  //attach auditLogger with instance of mysql (MUST COMER ONCE CONFIG IS LOADED)
  fastify.auditLogger.initiliaze(fastify.mysql, fastify.winston);

  const msg = `Running at: ${JSON.stringify(fastify.server.address())}`;
  console.log(msg);
  fastify.winston.info(msg);
};

//start the server
start();

// Export fastify for testing purpose
module.exports = { fastify };
