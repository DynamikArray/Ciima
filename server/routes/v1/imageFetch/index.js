const schema = require("../../../schemas/v1/imageFetch");
const handler = require("../../../handlers/v1/imageFetch");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const imageFetch = {
    schema: schema.imageFetch,
    handler: handler.imageFetch
  };
  fastify.get("/imageFetch", imageFetch);
  next();
};
