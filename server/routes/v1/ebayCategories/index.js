const schema = require("../../../schemas/v1/ebayCategories");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const handler = require("../../../handlers/v1/ebayCategories")(fastify);

  const ebayCategories = {
    schema: schema,
    handler: handler.ebayCategories
  };

  fastify.get("/ebayCategories", ebayCategories);
  next();
};
