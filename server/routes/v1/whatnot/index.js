const { uploadSalesFileSchema, searchSalesSchema } = require("../../../schemas/v1/whatnot");

module.exports = function (fastify, opts, next) {
  const { uploadSalesFile, searchSalesData } = require("../../../handlers/v1/whatnot")(fastify);

  fastify.post("/whatnot/upload", {
    preValidation: fastify.authenticate,
    schema: uploadSalesFileSchema,
    handler: uploadSalesFile,
  });

  fastify.post("/whatnot/search", {
    preValidation: fastify.authenticate,
    schema: searchSalesSchema,
    handler: searchSalesData,
  });

  next();
};
