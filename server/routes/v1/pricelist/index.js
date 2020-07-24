const {
  searchPricelistSchema,
  readPricelistSchema,
} = require("../../../schemas/v1/pricelist");
/**
 * Pricing routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const {
    searchPricelistHandler,
    readPricelistHandler,
  } = require("../../../handlers/v1/pricelist")(fastify);

  const searchPricelistRoute = {
    preValidation: fastify.authenticate,
    schema: searchPricelistSchema,
    handler: searchPricelistHandler,
  };
  fastify.post("/pricelist/search", searchPricelistRoute);

  const readPricelistRoute = {
    preValidation: fastify.authenticate,
    schema: readPricelistSchema,
    handler: readPricelistHandler,
  };
  fastify.get("/pricelist/:slc_IssueId", readPricelistRoute);

  next();
};
