const { pendingItems } = require("../../../../util/linnworks/queries/repackingService/pendingItems.js");

module.exports = (fastify) => ({
  pendingItemsHandler: async (req, res) => {
    try {
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: pendingItems(),
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
