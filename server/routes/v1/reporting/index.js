const { getSoldItemsSchema } = require("../../../schemas/v1/reporting");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const handler = require("../../../handlers/v1/reporting")(fastify);
  const getSoldItems = {
    preValidation: fastify.authenticate,
    schema: getSoldItemsSchema,
    handler: handler.getSoldItems,
  };

  fastify.get("/reporting/getSoldItems", getSoldItems);
  next();
};
