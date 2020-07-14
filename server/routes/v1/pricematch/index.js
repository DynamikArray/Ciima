const {
  searchTheirTitlesSchema,
  searchTheirIssuesSchema,
} = require("../../../schemas/v1/pricematch");
/**
 * PriceMathc routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const {
    searchTheirTitlesHandler,
    searchTheirIssuesHandler,
  } = require("../../../handlers/v1/pricematch")(fastify);

  const searchTheirTitlesRoute = {
    preValidation: fastify.authenticate,
    schema: searchTheirTitlesSchema,
    handler: searchTheirTitlesHandler,
  };
  fastify.get("/pricematch/searchTheirTitles", searchTheirTitlesRoute);

  const searchTheirIssuesRoute = {
    preValidation: fastify.authenticate,
    schema: searchTheirIssuesSchema,
    handler: searchTheirIssuesHandler,
  };
  fastify.get("/pricematch/searchTheirIssues", searchTheirIssuesRoute);
  next();
};
