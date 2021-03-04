const schema = require("../../../schemas/v1/reporting");

module.exports = function (fastify, opts, next) {
  const handler = require("../../../handlers/v1/reporting")(fastify);

  fastify.get("/reporting/getSoldItems", {
    preValidation: fastify.authenticate,
    schema: schema.getSoldItemsSchema,
    handler: handler.getSoldItems,
  });

  fastify.get("/reporting/getCategorySales", {
    //preValidation: fastify.authenticate,
    schema: schema.getCategorySalesSchema,
    handler: handler.getCategorySales,
  });

  next();
};
