const { buildNewItemsQuery } = require("./buildNewItemsQuery");
const { buildExistingItemsQuery } = require("./buildExistingItemsQuery");
const { buildDailyTotalsQuery } = require("./buildDailyTotalsQuery");
const { buildWeeklyTotalsQuery } = require("./buildWeeklyTotalsQuery");

module.exports = {
  buildExistingItemsQuery,
  buildNewItemsQuery,
  buildDailyTotalsQuery,
  buildWeeklyTotalsQuery,
};
