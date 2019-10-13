const { searchSoldSchema } = require("../../../../schemas/v1/ebay/search");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const { searchSoldHandler } = require("../../../../handlers/v1/ebay/search")(
    fastify
  );

  //Inventory Search
  const ebaySearch = {
    preValidation: fastify.authenticate,
    schema: searchSoldSchema,
    handler: searchSoldHandler
  };

  //http verbs
  fastify.post("/ebay/search", ebaySearch);
  next();
};
