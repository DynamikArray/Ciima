const {
  repriceItemByIdSchema,
} = require("../../../schemas/v1/repricingService");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const {
    repriceItemByIdHandler,
  } = require("../../../handlers/v1/repricingService")(fastify);

  const repriceItemById = {
    preValidation: fastify.authenticate,
    schema: repriceItemByIdSchema,
    handler: repriceItemByIdHandler,
  };

  fastify.post("/repriceItemById", repriceItemById);
  next();
};
