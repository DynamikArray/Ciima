const { buildNewItemsQuery } = require("./buildNewItemsQuery");
const { buildExistingItemsQuery } = require("./buildExistingItemsQuery");
const { buildDailyTotalsQuery } = require("./buildDailyTotalsQuery");

module.exports = {
  buildExistingItemsQuery,
  buildNewItemsQuery,
  buildDailyTotalsQuery,
};
