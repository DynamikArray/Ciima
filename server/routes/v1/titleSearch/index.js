const schema = require("../../../schemas/v1/titleSearch");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const handler = require("../../../handlers/v1/titleSearch")(fastify);

  const search = {
    schema: schema,
    handler: handler.titleSearch
  };

  fastify.get("/titleSearch", search);
  next();
};
