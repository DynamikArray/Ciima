const { getItemAspectsForCategorySchema, getEbaySiteCategoriesSchema } = require("../../../schemas/v1/ebayV2");

module.exports = function (fastify, opts, next) {
  const { getItemAspectsForCategory, getEbaySiteCategories } = require("../../../handlers/v1/ebayV2")(fastify);

  fastify.get("/ebayV2/getItemAspectsForCategory", {
    //preValidation: fastify.authenticate,
    schema: getItemAspectsForCategorySchema,
    handler: getItemAspectsForCategory,
  });

  fastify.get("/ebayV2/getEbaySiteCategories", {
    //preValidation: fastify.authenticate,
    schema: getEbaySiteCategoriesSchema,
    handler: getEbaySiteCategories,
  });

  next();
};
