const { analyticsSearchSchema, analyticsDashboardSchema } = require("../../../schemas/v1/analytics");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const { analyticsSearchHandler, analyticsDashboardHandler } = require("../../../handlers/v1/analytics")(fastify);

  fastify.get("/analytics", {
    preValidation: fastify.authenticate,
    schema: analyticsSearchSchema,
    handler: analyticsSearchHandler,
  });

  fastify.get("/dashboard", {
    //preValidation: fastify.authenticate,
    schema: analyticsDashboardSchema,
    handler: analyticsDashboardHandler,
  });

  next();
};
