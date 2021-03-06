const { format, subDays, addDays, parseISO } = require("date-fns");
const { categorySalesByDate } = require("../../../../util/linnworks/queries/orders/categorySalesByDate");

module.exports = (fastify) => ({
  getCategorySalesHandler: async (req, res) => {
    const query = req.query;
    const today = Date.now();

    const queryStartDate = query.startDate || format(subDays(today, 5), "Y-M-d");
    let endDate = query.endDate || format(today, "Y-M-d");
    let queryEndDate = format(addDays(parseISO(endDate), 1), "Y-M-d");
    const queryCategoryName = query.categoryName || "EBAY-LOTS";

    const data = categorySalesByDate(queryStartDate, queryEndDate, queryCategoryName);

    const { result, error } = await fastify.linnworks.makeApiCall({
      method: "POST",
      url: "Dashboards/ExecuteCustomScriptQuery",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data,
    });

    if (!result.IsError) return { result: result.Results, total: result.TotalResults };
    if (error) return { error: error };
  },
});
