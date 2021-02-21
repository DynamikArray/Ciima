const { checkLocationCodeSchema, updateTemplatesBatchSchema } = require("../../../../schemas/v1/inventory/utility");

module.exports = function (fastify, opts, next) {
  const { checkLocationCodeHandler, updateTemplatesBatchHandler } = require("../../../../handlers/v1/inventory/utility")(
    fastify
  );

  fastify.post("/inventory/utility/checkLocationCode", {
    preValidation: fastify.authenticate,
    schema: checkLocationCodeSchema,
    handler: checkLocationCodeHandler,
  });

  fastify.post("/inventory/utility/updateTemplatesBatch", {
    preValidation: fastify.authenticate,
    schema: updateTemplatesBatchSchema,
    handler: updateTemplatesBatchHandler,
  });

  next();
};
