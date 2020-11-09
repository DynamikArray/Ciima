const {
  repriceItemByIdSchema,
  getItemsListSchema,
} = require("../../../schemas/v1/repricingService");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const {
    repriceItemByIdHandler,
    getItemsListHandler,
  } = require("../../../handlers/v1/repricingService")(fastify);

  const getItemsList = {
    //preValidation: fastify.authenticate,
    schema: getItemsListSchema,
    handler: getItemsListHandler,
  };

  fastify.post("/getItemsList", getItemsList);

  const repriceItemById = {
    preValidation: fastify.authenticate,
    schema: repriceItemByIdSchema,
    handler: repriceItemByIdHandler,
  };

  fastify.post("/repriceItemById", repriceItemById);

  next();
};
