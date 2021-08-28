const { perComicPrice } = require("../../../../util/linnworks/queries/pricingService/perComicPrice/perComicPrice.js");

module.exports = (fastify) => ({
  /**
   * [getItemsListHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  getItemsListHandler: async (req, res) => {
    try {
      //send whatever params are required for the query to be built?
      const { thresholdPrice, flaggedItemsOnly } = req.body;
      const data = perComicPrice({ thresholdPrice, flaggedItemsOnly });

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
