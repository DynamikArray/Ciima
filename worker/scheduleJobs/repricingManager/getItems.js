const { linnworks } = require("../../../util/linnworks/linnworks.js");
const { getRepricingItemsList } = require("../../../util/linnworks/queries/repricer/lots/getRepricingItemsList.js");

module.exports = async () => {
  try {
    //not been repriced hence the false
    const data = getRepricingItemsList();

    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Dashboards/ExecuteCustomScriptQuery",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data,
    });

    if (result && !result.IsError) {
      return { result: result.Results, total: result.TotalResults };
    }

    if (error) return { error: error };
  } catch (e) {
    throw e;
  }
};
