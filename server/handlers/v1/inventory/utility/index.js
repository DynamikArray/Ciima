const checkLocationCodeSQL = require("../../../../../util/linnworks/queries/inventory/checkLocationCode");

module.exports = (fastify) => ({
  checkLocationCodeHandler: async (req, res) => {
    const strLocationCode = req.body.locationCode;
    const data = checkLocationCodeSQL(strLocationCode);

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
