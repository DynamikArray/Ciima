const {
  searchInventorySchema,
  updateLocationOrQuantitySchema
} = require("../../../../schemas/v1/inventory/linnworks");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const {
    searchInventoryHandler,
    updateLocationOrQuantityHandler
  } = require("../../../../handlers/v1/inventory/linnworks")(fastify);

  //Inventory Search
  const linnworksSearch = {
    preValidation: fastify.authenticate,
    schema: searchInventorySchema,
    handler: searchInventoryHandler
  };

  //location/quantity update
  const linnworksUpdateLocationOrQuantity = {
    preValidation: fastify.authenticate,
    schema: updateLocationOrQuantitySchema,
    handler: updateLocationOrQuantityHandler
  };

  //http verbs
  fastify.post("/inventory/linnworks/search", linnworksSearch);

  fastify.post(
    "/inventory/linnworks/update",
    linnworksUpdateLocationOrQuantity
  );
  next();
};
