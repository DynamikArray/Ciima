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
  connectionString: connectionString
});

fastify.register(require("fastify-rabbit"), {
  url: process.env.CLOUDAMQP_URL
});

fastify.register(require("fastify-cors"), {
  // put your options here
});

//static build dir
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "../client/dist"),
  wildcard: false
});

//Swagger Docs
fastify.register(swagger, documentation);

//Routes
fastify.register(require("./routes/v1/info"), { prefix: "v1" });
fastify.register(require("./routes/v1/titleSearch"), { prefix: "v1" });
fastify.register(require("./routes/v1/issueSearch"), { prefix: "v1" });
fastify.register(require("./routes/v1/ebayCategories"), { prefix: "v1" });
fastify.register(require("./routes/v1/imageFetch"), { prefix: "v1" });
fastify.register(require("./routes/v1/draft"), { prefix: "v1" });
fastify.register(require("./routes/v1/drafts"), { prefix: "v1" });
fastify.register(require("./routes/v1/submitDraft"), { prefix: "v1" });

fastify.get("*", function(request, reply) {
  reply.sendFile("index.html");
});

// Server
const start = async () => {
  //infolog
  fastify.winston.info("Starting Fastify Server");

  await fastify.listen(config).catch(e => {
    fastify.log.error(
      `We caught an error trying to start the server: ${JSON.stringify(
        e.message
      )}`
    );
    //wait a 3 seconds for logs to finish so we know what happened?
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  }); //end catch;

  //infolog
  fastify.log.info(
    `Server is running at ${JSON.stringify(fastify.server.address())}`
  );
};

//start the server
start();

// Export fastify for testing purpose
module.exports = { fastify };
