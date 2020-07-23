const {
  searchTheirTitlesSchema,
  searchTheirIssuesSchema,
  searchOurIssuesSchema,
  getPageTheirIssuesSchema,
  createIssueMatchSchema,
  updateIssueMatchSchema,
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
    searchOurIssuesHandler,
    getPageTheirIssuesHandler,
    createIssueMatchHandler,
    updateIssueMatchHandler,
  } = require("../../../handlers/v1/pricematch")(fastify);

  const searchTheirTitlesRoute = {
    preValidation: fastify.authenticate,
    schema: searchTheirTitlesSchema,
    handler: searchTheirTitlesHandler,
  };
  fastify.get("/pricematch/searchTheirTitles", searchTheirTitlesRoute);

  const searchOurIssuesRoute = {
    preValidation: fastify.authenticate,
    schema: searchOurIssuesSchema,
    handler: searchOurIssuesHandler,
  };
  fastify.get("/pricematch/searchOurIssues", searchOurIssuesRoute);
  next();

  const searchTheirIssuesRoute = {
    preValidation: fastify.authenticate,
    schema: searchTheirIssuesSchema,
    handler: searchTheirIssuesHandler,
  };
  fastify.get("/pricematch/searchTheirIssues", searchTheirIssuesRoute);
  next();

  const getPageTheirIssuesRoute = {
    preValidation: fastify.authenticate,
    schema: getPageTheirIssuesSchema,
    handler: getPageTheirIssuesHandler,
  };
  fastify.get("/pricematch/getPageTheirIssues", getPageTheirIssuesRoute);
  next();

  /*  C-RUD */
  const createIssueMatchRoute = {
    preValidation: fastify.authenticate,
    schema: createIssueMatchSchema,
    handler: createIssueMatchHandler,
  };
  fastify.post("/pricematch/createIssueMatch", createIssueMatchRoute);
  next();
  /* CR-U-D */
  const updateIssueMatchRoute = {
    preValidation: fastify.authenticate,
    schema: updateIssueMatchSchema,
    handler: updateIssueMatchHandler,
  };
  fastify.put("/pricematch/updateIssueMatch", updateIssueMatchRoute);
  next();
};
