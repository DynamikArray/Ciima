const {
  analyticsSearchSchema,
  analyticsDashboardSchema,
  getUserTargetsSchema,
  postUserTargetsSchema,
  putUserTargetsSchema,
  deleteUserTargetsSchema,
} = require("../../../schemas/v1/analytics");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const {
    analyticsSearchHandler,
    analyticsDashboardHandler,
    getUserTargetsHandler,
    postUserTargetsHandler,
    putUserTargetsHandler,
    deleteUserTargetsHandler,
  } = require("../../../handlers/v1/analytics")(fastify);

  fastify.get("/analytics", {
    preValidation: fastify.authenticate,
    schema: analyticsSearchSchema,
    handler: analyticsSearchHandler,
  });

  fastify.get("/dashboard", {
    preValidation: fastify.authenticate,
    schema: analyticsDashboardSchema,
    handler: analyticsDashboardHandler,
  });

  fastify.get("/managers/userTargets", {
    preValidation: fastify.authenticate,
    schema: getUserTargetsSchema,
    handler: getUserTargetsHandler,
  });

  fastify.post("/managers/userTargets", {
    preValidation: fastify.authenticate,
    schema: postUserTargetsSchema,
    handler: postUserTargetsHandler,
  });

  fastify.put("/managers/userTargets", {
    preValidation: fastify.authenticate,
    schema: putUserTargetsSchema,
    handler: putUserTargetsHandler,
  });

  fastify.delete("/managers/userTargets", {
    preValidation: fastify.authenticate,
    schema: deleteUserTargetsSchema,
    handler: deleteUserTargetsHandler,
  });

  next();
};
