const { keepAliveSchema } = require("../../../schemas/v1/info");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const { keepAliveHandler } = require("../../../handlers/v1/info")(fastify);

  const info = {
    schema: keepAliveSchema,
    handler: keepAliveHandler
  };
  fastify.get("/info", info);
  next();
};
