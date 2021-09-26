const {
  buildUserDailyTotalsQuery,
  buildUserDraftsInputtedForWeekQuery,
} = require("../../../../util/ciima/queries/analytics");

const { getTargetValueForUser } = require("../../../../util/ciima/getTargetValueForUser");

module.exports = (fastify) => ({
  analyticsDashboardHandler: async (req, reply) => {
    const { userId, startDate, endDate } = req.query;

    const targetValue = await getTargetValueForUser(fastify.mysql, userId, startDate, endDate);

    const userTarget = {
      targetValue: targetValue,
    };

    const userDailyTotals = buildUserDailyTotalsQuery({ userId, targetValue, startDate, endDate });
    const userDraftsForWeek = buildUserDraftsInputtedForWeekQuery({ userId, startDate, endDate });

    const [userTotals] = await fastify.mysql.query(userDailyTotals.query);
    const [userDrafts] = await fastify.mysql.query(userDraftsForWeek.query);

    return { result: { userTotals, userDrafts, userTarget } };
  },
});
