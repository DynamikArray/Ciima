const { format, subDays } = require("date-fns");

const {
  ordersByDate,
} = require("../../../../util/linnworks/queries/orders/ordersByDate");

module.exports = (fastify) => ({
  getSoldItems: async (req, reply) => {
    const query = req.query;
    const today = Date.now();

    const strStartDate = query.startDate || format(subDays(today, 5), "Y-M-d");
    const strEndDate = query.endDate || format(today, "Y-M-d");
    const strCategoryName = query.categoryName || "EBAY-LOTS";

    const data = ordersByDate(strStartDate, strEndDate, strCategoryName);
    const { result, error } = await fastify.linnworks.makeApiCall({
      method: "POST",
      url: "Dashboards/ExecuteCustomScriptQuery",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data,
    });

    if (!result.IsError)
      return { result: result.Results, total: result.TotalResults };
    if (error) return { error: error };
  },
});
