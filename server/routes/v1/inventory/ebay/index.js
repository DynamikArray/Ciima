const {
  loadInventorySchema
} = require("../../../../schemas/v1/inventory/ebay");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const {
    loadInventoryHandler
  } = require("../../../../handlers/v1/inventory/ebay")(fastify);

  //Inventory Search
  const ebayLoad = {
    preValidation: fastify.authenticate,
    schema: loadInventorySchema,
    handler: loadInventoryHandler
  };

  //http verbs
  fastify.post("/inventory/ebay/load", ebayLoad);
  next();
};
