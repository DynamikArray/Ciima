const { getItemsListSchema } = require("../../../schemas/v1/pricingService");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const { getItemsListHandler } = require("../../../handlers/v1/pricingService")(fastify);

  fastify.post("/getItemsList", {
    preValidation: fastify.authenticate,
    schema: getItemsListSchema,
    handler: getItemsListHandler,
  });

  next();
};
