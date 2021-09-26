module.exports = (fastify) => {
  const { analyticsSearchHandler } = require("./analyticsSearchHandler")(fastify);
  const { analyticsDashboardHandler } = require("./analyticsDashboardHandler")(fastify);
  const {
    getUserTargetsHandler,
    postUserTargetsHandler,
    putUserTargetsHandler,
    deleteUserTargetsHandler,
  } = require("./manager")(fastify);

  return {
    analyticsSearchHandler,
    analyticsDashboardHandler,
    getUserTargetsHandler,
    postUserTargetsHandler,
    putUserTargetsHandler,
    deleteUserTargetsHandler,
  };
};
