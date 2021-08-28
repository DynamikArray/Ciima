const { analytics } = require("../../../config/appConstants");
const {
  buildUserDailyTotalsQuery,
  buildUserDraftsInputtedForWeekQuery,
} = require("../../../../util/ciima/queries/analytics");

const { getTargetValueForUser } = require("../../../../util/ciima/getTargetValueForUser");

module.exports = (fastify) => ({
  analyticsDashboardHandler: async (req, reply) => {
    const { userId, startDate, endDate } = req.query;
    const targetValue = await getTargetValueForUser(fastify.mysql, userId);

    const userDailyTotals = buildUserDailyTotalsQuery({ userId, targetValue, startDate, endDate });
    const userDraftsForWeek = buildUserDraftsInputtedForWeekQuery({ userId, startDate, endDate });

    const [userTotals] = await fastify.mysql.query(userDailyTotals.query);
    const [userDrafts] = await fastify.mysql.query(userDraftsForWeek.query);

    return { result: { userTotals, userDrafts } };
  },
});
