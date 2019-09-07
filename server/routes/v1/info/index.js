const schema = require("../../../schemas/v1/info");
const handler = require("../../../handlers/v1/info");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const info = {
    schema: schema.keepAlive,
    handler: handler.keepAlive
  };
  fastify.get("/info", info);
  next();
};
