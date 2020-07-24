const {
  searchTheirTitlesSchema,
  searchTheirIssuesSchema,
  searchOurIssuesSchema,
  getPageTheirIssuesSchema,
  createIssueMatchSchema,
  updateIssueMatchSchema,
  deleteIssueMatchSchema,
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
    deleteIssueMatchHandler,
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

  const searchTheirIssuesRoute = {
    preValidation: fastify.authenticate,
    schema: searchTheirIssuesSchema,
    handler: searchTheirIssuesHandler,
  };
  fastify.get("/pricematch/searchTheirIssues", searchTheirIssuesRoute);

  const getPageTheirIssuesRoute = {
    preValidation: fastify.authenticate,
    schema: getPageTheirIssuesSchema,
    handler: getPageTheirIssuesHandler,
  };
  fastify.get("/pricematch/getPageTheirIssues", getPageTheirIssuesRoute);

  /*  C-RUD */
  const createIssueMatchRoute = {
    preValidation: fastify.authenticate,
    schema: createIssueMatchSchema,
    handler: createIssueMatchHandler,
  };
  fastify.post("/pricematch/createIssueMatch", createIssueMatchRoute);

  /* CR-U-D */
  const updateIssueMatchRoute = {
    preValidation: fastify.authenticate,
    schema: updateIssueMatchSchema,
    handler: updateIssueMatchHandler,
  };
  fastify.put("/pricematch/updateIssueMatch", updateIssueMatchRoute);

  /* CRU-D */
  const deleteIssueMatchRoute = {
    preValidation: fastify.authenticate,
    schema: deleteIssueMatchSchema,
    handler: deleteIssueMatchHandler,
  };
  fastify.delete(
    "/pricematch/deleteIssueMatch/:slc_IssueId",
    deleteIssueMatchRoute
  );

  next();
};
