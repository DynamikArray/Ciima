const {
  searchInventorySchema,
  updateLocationOrQuantitySchema,
  updateInventoryItemFieldSchema
} = require("../../../../schemas/v1/inventory/linnworks");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const {
    searchInventoryHandler,
    updateLocationOrQuantityHandler,
    updateItemFieldHandler
  } = require("../../../../handlers/v1/inventory/linnworks")(fastify);

  //Inventory Search
  const linnworksSearch = {
    preValidation: fastify.authenticate,
    schema: searchInventorySchema,
    handler: searchInventoryHandler
  };
  //http verbs
  fastify.post("/inventory/linnworks/search", linnworksSearch);

  //location/quantity update
  const linnworksUpdateLocationOrQuantity = {
    preValidation: fastify.authenticate,
    schema: updateLocationOrQuantitySchema,
    handler: updateLocationOrQuantityHandler
  };

  fastify.post(
    "/inventory/linnworks/updateLocationField",
    linnworksUpdateLocationOrQuantity
  );

  //Retail Price / Title fields NON Location BASED updates
  const linnworksUpdateItemField = {
    preValidation: fastify.authenticate,
    schema: updateInventoryItemFieldSchema,
    handler: updateItemFieldHandler
  };

  fastify.post(
    "/inventory/linnworks/updateItemField",
    linnworksUpdateItemField
  );

  next();
};
