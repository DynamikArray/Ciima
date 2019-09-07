//include our server config file
const config = require("./config/config");
// Require the framework and instantiate it
const fastify = require("fastify")(config);

//include mysql
fastify.register(require("fastify-mysql"), {
  promise: true,
  connectionString: process.env.MYSQL_CONN
});

//Routes
fastify.register(require("./routes/v1/info"), { prefix: "v1" });
fastify.register(require("./routes/v1/search"), { prefix: "v1" });

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
