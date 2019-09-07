//include our server config file
const config = require("./config/config");

//include our routes files
const { v1 } = require("./routes");

// Require the framework and instantiate it
const fastify = require("fastify")(config);

fastify.register(v1, { prefix: "/v1" });

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
