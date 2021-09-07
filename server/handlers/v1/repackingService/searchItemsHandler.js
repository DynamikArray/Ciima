const { searchItems } = require("../../../../util/linnworks/queries/repackingService/searchItems.js");

module.exports = (fastify) => ({
  /**
   * [getItemsListHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  searchItemsHandler: async (req, res) => {
    try {
      //send whatever params are required for the query to be built?
      const { thresholdPrice, flaggedItemsOnly } = req.body;
      const data = searchItems({ thresholdPrice, flaggedItemsOnly });

      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });

      if (result && !result.IsError) {
        return { result: result.Results, total: result.Results.length };
      }

      if (error) return { error: error };
    } catch (e) {
      throw e;
    }
  },
});
