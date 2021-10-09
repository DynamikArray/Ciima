const { getItemAspectsForCategorySchema } = require("../../../schemas/v1/ebayV2");

module.exports = function (fastify, opts, next) {
  const { getItemAspectsForCategory } = require("../../../handlers/v1/ebayV2")(fastify);

  fastify.get("/ebayV2/getItemAspectsForCategory", {
    //preValidation: fastify.authenticate,
    schema: getItemAspectsForCategorySchema,
    handler: getItemAspectsForCategory,
  });

  next();
};
