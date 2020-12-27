const {
  checkLocationCodeSchema,
  updateTemplatesBatchSchema,
} = require("../../../../schemas/v1/inventory/utility");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const {
    checkLocationCodeHandler,
    updateTemplatesBatchHandler,
  } = require("../../../../handlers/v1/inventory/utility")(fastify);

  const checkLocationCode = {
    preValidation: fastify.authenticate,
    schema: checkLocationCodeSchema,
    handler: checkLocationCodeHandler,
  };
  fastify.post("/inventory/utility/checkLocationCode", checkLocationCode);

  const updateTemplatesBatch = {
    //preValidation: fastify.authenticate,
    schema: updateTemplatesBatchSchema,
    handler: updateTemplatesBatchHandler,
  };
  fastify.post("/inventory/utility/updateTemplatesBatch", updateTemplatesBatch);

  next();
};
