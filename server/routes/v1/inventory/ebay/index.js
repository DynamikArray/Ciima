const {
  searchInventorySchema
} = require("../../../../schemas/v1/inventory/ebay");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const {
    searchInventoryHandler
  } = require("../../../../handlers/v1/inventory/ebay")(fastify);

  //Inventory Search
  const ebaySearch = {
    preValidation: fastify.authenticate,
    schema: searchInventorySchema,
    handler: searchInventoryHandler
  };

  //http verbs
  fastify.post("/inventory/ebay/search", ebaySearch);
  next();
};
