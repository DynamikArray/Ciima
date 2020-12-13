const selectItemQuery = require("../../../../../util/linnworks/queries/inventory/selectInventoryItemDetails");

module.exports = (fastify) => ({
  selectHandler: async (req, res) => {
    const { pkStockItemID } = req.body;

    const data = selectItemQuery(pkStockItemID);
    const { result, error } = await fastify.linnworks.makeApiCall({
      method: "POST",
      url: "Dashboards/ExecuteCustomScriptQuery",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data,
    });

    if (!result.IsError) return { result: result.Results[0] };
    if (error) return { error: error };
  },
});
