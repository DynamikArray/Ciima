const selectInventoryItemToClone = require("../../../../../util/linnworks/queries/inventory/selectInventoryItemToClone");

module.exports = (fastify) => ({
  selectToCloneHandler: async (req, res) => {
    const { pkStockItemID } = req.body;
    try {
      const data = selectInventoryItemToClone(pkStockItemID);

      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });

      if (!result.IsError) return { result: result.Results, total: result.TotalResults };
      if (error) return { error: error };
    } catch (error) {
      fastify.winston.error(error);
    }
  },
});
