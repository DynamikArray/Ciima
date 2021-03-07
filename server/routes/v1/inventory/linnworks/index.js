const {
  searchInventorySchema,
  updateLocationOrQuantitySchema,
  updateInventoryItemFieldSchema,
  updateItemPricesSchema,
  getOutOfSyncPricesSchema,
  //V2 Improved
  inventorySearchSchema,
  inventoryItemSchema,
  inventoryItemUpdateFieldSchema,
  inventoryItemUpdateExtendedPropertiesSchema,
  inventoryItemUpdateTemplateInstantSchema,
  inventoryItemUpdatePriceSchema,
  inventoryItemAddPriceSchema,
  inventoryItemSelectToCloneSchema,
} = require("../../../../schemas/v1/inventory/linnworks");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */

module.exports = function (fastify, opts, next) {
  const {
    searchInventoryHandler,
    updateLocationOrQuantityHandler,
    updateItemFieldHandler,
    updateItemPricesHandler,
    getOutOfSyncPricesHandler,
    //V2 Improved Title Searching
    inventorySearchHandler,
    inventoryItemHandler,
    inventoryItemUpdateFieldHandler,
    inventoryItemUpdateExtendedPropertiesHandler,
    inventoryItemUpdateTemplateInstantHandler,
    inventoryItemUpdatePriceHandler,
    inventoryItemAddPriceHandler,
    inventoryItemSelectToCloneHandler,
  } = require("../../../../handlers/v1/inventory/linnworks")(fastify);

  //-----------------V2 IMPROVED START ------------------------
  //IMPORVED Inventory Search
  fastify.post("/inventory/search", {
    preValidation: fastify.authenticate,
    schema: inventorySearchSchema,
    handler: inventorySearchHandler,
  });

  fastify.post("/inventory/selectItem", {
    preValidation: fastify.authenticate,
    schema: inventoryItemSchema,
    handler: inventoryItemHandler,
  });

  fastify.post("/inventory/updateItemField", {
    preValidation: fastify.authenticate,
    schema: inventoryItemUpdateFieldSchema,
    handler: inventoryItemUpdateFieldHandler,
  });

  fastify.post("/inventory/updateItemExtenedProperties", {
    preValidation: fastify.authenticate,
    schema: inventoryItemUpdateExtendedPropertiesSchema,
    handler: inventoryItemUpdateExtendedPropertiesHandler,
  });

  fastify.post("/inventory/updateItemTemplateInstant", {
    preValidation: fastify.authenticate,
    schema: inventoryItemUpdateTemplateInstantSchema,
    handler: inventoryItemUpdateTemplateInstantHandler,
  });

  fastify.post("/inventory/updateItemPrice", {
    preValidation: fastify.authenticate,
    schema: inventoryItemUpdatePriceSchema,
    handler: inventoryItemUpdatePriceHandler,
  });

  fastify.post("/inventory/addItemPrice", {
    preValidation: fastify.authenticate,
    schema: inventoryItemAddPriceSchema,
    handler: inventoryItemAddPriceHandler,
  });

  fastify.post("/inventory/selectItemToClone", {
    preValidation: fastify.authenticate,
    schema: inventoryItemSelectToCloneSchema,
    handler: inventoryItemSelectToCloneHandler,
  });

  //------------V2 IMPROVED END-----------------------------

  // START OLD STUFF
  //
  //
  //
  //
  //Inventory Search
  const linnworksSearch = {
    preValidation: fastify.authenticate,
    schema: searchInventorySchema,
    handler: searchInventoryHandler,
  };
  //http verbs
  fastify.post("/inventory/linnworks/search", linnworksSearch);

  //location/quantity update
  const linnworksUpdateLocationOrQuantity = {
    preValidation: fastify.authenticate,
    schema: updateLocationOrQuantitySchema,
    handler: updateLocationOrQuantityHandler,
  };

  fastify.post("/inventory/linnworks/updateLocationField", linnworksUpdateLocationOrQuantity);

  //Retail Price / Title fields NON Location BASED updates
  const linnworksUpdateItemField = {
    preValidation: fastify.authenticate,
    schema: updateInventoryItemFieldSchema,
    handler: updateItemFieldHandler,
  };

  fastify.post("/inventory/linnworks/updateItemField", linnworksUpdateItemField);

  //ALL Price fields for an item
  const linnworksUpdateItemPrices = {
    preValidation: fastify.authenticate,
    schema: updateItemPricesSchema,
    handler: updateItemPricesHandler,
  };

  fastify.post("/inventory/linnworks/updateItemPrices", linnworksUpdateItemPrices);

  //ALL Price fields for an item
  const getOutOfSyncPrices = {
    preValidation: fastify.authenticate,
    schema: getOutOfSyncPricesSchema,
    handler: getOutOfSyncPricesHandler,
  };
  fastify.get("/inventory/linnworks/outOfSyncPrices", getOutOfSyncPrices);

  next();
};
