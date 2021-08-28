const { buildNewItemsQuery } = require("./buildNewItemsQuery");
const { buildExistingItemsQuery } = require("./buildExistingItemsQuery");
const { buildDailyTotalsQuery } = require("./buildDailyTotalsQuery");
const { buildWeeklyTotalsQuery } = require("./buildWeeklyTotalsQuery");
const { buildUserDailyTotalsQuery } = require("./buildUserDailyTotalsQuery");
const { buildUserDraftsInputtedForWeekQuery } = require("./buildUserDraftsInputtedForWeekQuery");

module.exports = {
  buildExistingItemsQuery,
  buildNewItemsQuery,
  buildDailyTotalsQuery,
  buildWeeklyTotalsQuery,
  // Dashboard
  buildUserDailyTotalsQuery,
  buildUserDraftsInputtedForWeekQuery,
};
