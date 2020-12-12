const {
  searchInventorySchema,
  inventorySearchSchema, //V2 Improved
  updateLocationOrQuantitySchema,
  updateInventoryItemFieldSchema,
  updateItemPricesSchema,
  getOutOfSyncPricesSchema,
} = require("../../../../schemas/v1/inventory/linnworks");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const {
    searchInventoryHandler,
    inventorySearchHandler, //V2 Improved Title Searching
    updateLocationOrQuantityHandler,
    updateItemFieldHandler,
    updateItemPricesHandler,
    getOutOfSyncPricesHandler,
  } = require("../../../../handlers/v1/inventory/linnworks")(fastify);

  //Inventory Search
  const linnworksSearch = {
    preValidation: fastify.authenticate,
    schema: searchInventorySchema,
    handler: searchInventoryHandler,
  };
  //http verbs
  fastify.post("/inventory/linnworks/search", linnworksSearch);

  //IMPORVED Inventory Search
  const inventorySearch = {
    preValidation: fastify.authenticate,
    schema: inventorySearchSchema,
    handler: inventorySearchHandler,
  };
  //http verbs
  fastify.post("/inventory/search", inventorySearch);

  //location/quantity update
  const linnworksUpdateLocationOrQuantity = {
    preValidation: fastify.authenticate,
    schema: updateLocationOrQuantitySchema,
    handler: updateLocationOrQuantityHandler,
  };

  fastify.post(
    "/inventory/linnworks/updateLocationField",
    linnworksUpdateLocationOrQuantity
  );

  //Retail Price / Title fields NON Location BASED updates
  const linnworksUpdateItemField = {
    preValidation: fastify.authenticate,
    schema: updateInventoryItemFieldSchema,
    handler: updateItemFieldHandler,
  };

  fastify.post(
    "/inventory/linnworks/updateItemField",
    linnworksUpdateItemField
  );

  //ALL Price fields for an item
  const linnworksUpdateItemPrices = {
    //preValidation: fastify.authenticate,
    schema: updateItemPricesSchema,
    handler: updateItemPricesHandler,
  };

  fastify.post(
    "/inventory/linnworks/updateItemPrices",
    linnworksUpdateItemPrices
  );

  //ALL Price fields for an item
  const getOutOfSyncPrices = {
    //preValidation: fastify.authenticate,
    schema: getOutOfSyncPricesSchema,
    handler: getOutOfSyncPricesHandler,
  };
  fastify.get("/inventory/linnworks/outOfSyncPrices", getOutOfSyncPrices);

  next();
};
