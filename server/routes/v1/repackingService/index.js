const {
  searchItemsSchema,
  submitItemSchema,
  pendingItemsSchema,
  completedItemsSchema,
  finalizeItemSchema,
} = require("../../../schemas/v1/repackingService");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  /**
   * REQUIRES FOR ROUTE HANDLERS PASSING FASTIFY
   * @type {[type]}
   */
  const {
    searchItemsHandler,
    submitItemHandler,
    pendingItemsHandler,
    completedItemsHandler,
    finalizeItemHandler,
  } = require("../../../handlers/v1/repackingService")(fastify);

  /**
   * START ROUTES
   */
  fastify.post("/searchItems", {
    preValidation: fastify.authenticate,
    schema: searchItemsSchema,
    handler: searchItemsHandler,
  });

  fastify.post("/submitItem", {
    preValidation: fastify.authenticate,
    schema: submitItemSchema,
    handler: submitItemHandler,
  });

  fastify.post("/pendingItems", {
    preValidation: fastify.authenticate,
    schema: pendingItemsSchema,
    handler: pendingItemsHandler,
  });

  fastify.post("/finalizeItem", {
    preValidation: fastify.authenticate,
    schema: finalizeItemSchema,
    handler: finalizeItemHandler,
  });

  fastify.post("/completedItems", {
    preValidation: fastify.authenticate,
    schema: completedItemsSchema,
    handler: completedItemsHandler,
  });

  next();
};
