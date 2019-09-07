const schema = require("../../../schemas/v1/search");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const handler = require("../../../handlers/v1/search")(fastify);

  const search = {
    schema: schema,
    handler: handler.search
  };

  fastify.get("/search", search);
  next();
};
