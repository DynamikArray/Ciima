module.exports = (fastify) => {
  const { analyticsSearchHandler } = require("./analyticsSearchHandler")(fastify);
  const { analyticsDashboardHandler } = require("./analyticsDashboardHandler")(fastify);

  return {
    analyticsSearchHandler: analyticsSearchHandler,
    analyticsDashboardHandler: analyticsDashboardHandler,
  };
};
