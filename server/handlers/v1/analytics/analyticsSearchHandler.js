const {
  buildNewItemsQuery,
  buildExistingItemsQuery,
  buildDailyTotalsQuery,
  buildWeeklyTotalsQuery,
} = require("../../../../util/ciima/queries/analytics");

const { format, addMonths } = require("date-fns");

module.exports = (fastify) => ({
  analyticsSearchHandler: async (req, reply) => {
    //query params
    const days = req.query.days || 0; //default to today only

    //Userid Transformer
    let userId = ""; //days of data for now
    if (req.query.userId) {
      if (req.query.userId == "ALL") {
        userId = "";
      } else {
        userId = Number(req.query.userId);
      }
    }

    //startDate and EndDate for weeklyTotals
    const today = new Date();
    const endDate = format(today, "y-MM-dd");
    const startDate = format(addMonths(today, -6), "y-MM-dd");

    //sql creation
    const newItemsSqlOpts = buildNewItemsQuery(days, userId);
    const existingItemsSqlOpts = buildExistingItemsQuery(days, userId);
    const dailyTotalsSqlOpts = buildDailyTotalsQuery();
    const weeklyTotalsSqlOpts = buildWeeklyTotalsQuery(startDate, endDate);

    const [newItems] = await fastify.mysql.query(newItemsSqlOpts.query, newItemsSqlOpts.params);

    const [existingItems] = await fastify.mysql.query(existingItemsSqlOpts.query, existingItemsSqlOpts.params);

    const [dailyTotals] = await fastify.mysql.query(dailyTotalsSqlOpts.query);
    const [weeklyTotals] = await fastify.mysql.query(weeklyTotalsSqlOpts.query);

    return { result: { newItems, existingItems, dailyTotals, weeklyTotals } };
  },
});
