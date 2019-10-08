const {
  searchInventorySchema
} = require("../../../../schemas/v1/inventory/linnworks");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const {
    searchInventoryHandler
  } = require("../../../../handlers/v1/inventory/linnworks")(fastify);

  const linnworksSearch = {
    preValidation: fastify.authenticate,
    schema: searchInventorySchema,
    handler: searchInventoryHandler
  };

  fastify.post("/inventory/linnworks/search", linnworksSearch);

  next();
};
