const { pricingSchema } = require("../../../schemas/v1/pricing");
/**
 * Pricing routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const { pricingHandler } = require("../../../handlers/v1/pricing")(fastify);

  const pricingRoute = {
    preValidation: fastify.authenticate,
    schema: pricingSchema,
    handler: pricingHandler
  };

  fastify.post("/pricing", pricingRoute);
  next();
};
