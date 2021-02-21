const checkLocationCodeSQL = require("../../../../../util/linnworks/queries/inventory/checkLocationCode");

module.exports = (fastify) => ({
  checkLocationCodeHandler: async (req, res) => {
    const strLocationCode = req.body.locationCode;

    const checkInInventory = async (strLocationCode) => {
      const data = checkLocationCodeSQL(strLocationCode);
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });

      if (!result.IsError)
        return {
          result: result.Results,
          total: result.TotalResults,
          error: false,
        };
      if (error) return { error: error, result: false };
    };

    const checkInDrafts = async (strLocationCode) => {
      const openDraftsLocationCodeQuery = `SELECT * FROM slc_drafts d
        WHERE d.status = "OPEN" AND d.locationCode = "${strLocationCode}"`;

      try {
        const [rows, fields] = await fastify.mysql.query(openDraftsLocationCodeQuery);
        return { result: rows };
      } catch (error) {
        fastify.winston.error(error);
        return error;
      }
    };

    try {
      const results = await Promise.all([checkInInventory(strLocationCode), checkInDrafts(strLocationCode)]);

      if (results[0].total > 0 || results[1].result.length > 0) {
        return { result: ["Found Items"] };
      } else {
        return { result: [] };
      }
    } catch (err) {
      fastify.winston.error(err);
    }
  },
});
