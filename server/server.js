const path = require("path");
//include our server config file
const { config, documentation } = require("./config/config");

// Require the framework and instantiate it
const fastify = require("fastify")(config);
const swagger = require("fastify-swagger");

//proper mysql connection string if prod
let connectionString = process.env.MYSQL_CONN;
if (process.env.NODE_ENV === "production")
  connectionString = process.env.JAWSDB_URL;

//register mystl
fastify.register(require("fastify-mysql"), {
  promise: true,
  connectionString: connectionString
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

fastify.get("*", function(request, reply) {
  reply.sendFile("index.html");
});

// Server
const start = async () => {
  await fastify.listen(config).catch(e => {
    fastify.log.error(e);
    process.exit(1);
  });
  fastify.serverAddress = fastify.server.address();
};

//start the server
start();

// Export fastify for testing purpose
module.exports = { fastify };
