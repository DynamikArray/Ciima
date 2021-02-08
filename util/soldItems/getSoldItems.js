const { linnworks } = require("../../util/linnworks/linnworks.js");
const { format, subDays } = require("date-fns");

const { dailySoldItems } = require("../../util/linnworks/queries/orders/dailySoldItems");

const getSoldItems = async () => {
  const today = Date.now();

  const strStartDate = format(subDays(today, 1), "Y-M-d");
  const strEndDate = format(today, "Y-M-d");
  //const strEndDate = format(subDays(today, 30), "Y-M-d");

  const data = dailySoldItems(strStartDate, strEndDate);

  const { result, error } = await linnworks.makeApiCall({
    method: "POST",
    url: "Dashboards/ExecuteCustomScriptQuery",
    headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
    data,
  });

  if (result && !result.IsError) return { result: result.Results, total: result.TotalResults };
  if (error) return { error: error };
};

module.exports = getSoldItems;
