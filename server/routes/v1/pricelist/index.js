const { searchPricelistSchema } = require("../../../schemas/v1/pricelist");
/**
 * Pricing routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const { searchPricelistHandler } = require("../../../handlers/v1/pricelist")(
    fastify
  );

  const searchPricelistRoute = {
    preValidation: fastify.authenticate,
    schema: searchPricelistSchema,
    handler: searchPricelistHandler,
  };

  fastify.post("/pricelist/search", searchPricelistRoute);
  next();
};
