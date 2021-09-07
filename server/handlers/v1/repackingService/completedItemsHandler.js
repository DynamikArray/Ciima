const { completedItems } = require("../../../../util/linnworks/queries/repackingService/completedItems.js");

module.exports = (fastify) => ({
  completedItemsHandler: async (req, res) => {
    try {
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: completedItems(),
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
