const schema = require("../../../schemas/v1/ebayCategories");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const handler = require("../../../handlers/v1/ebayCategories")(fastify);

  const ebayCategories = {
    preValidation: fastify.authenticate,
    schema: schema.ebayCategories,
    handler: handler.ebayCategories,
  };

  fastify.get("/ebayCategories", ebayCategories);

  const ebaySiteCategories = {
    preValidation: fastify.authenticate,
    schema: schema.ebaySiteCategories,
    handler: handler.ebaySiteCategories,
  };

  fastify.get("/ebaySiteCategories", ebaySiteCategories);

  next();
};
