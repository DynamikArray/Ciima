const queryString = require("query-string");

module.exports = fastify => ({
  searchInventoryHandler: async (req, res) => {
    const keyword = req.body.searchString;
    const formattedData = `keyword=${keyword}&loadCompositeParents=true&loadVariationParents=true&entriesPerPage=200&pageNumber=1&dataRequirements=[0,2,4,5,6]&searchTypes=[0,1,2]`;

    try {
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Stock/GetStockItemsFull",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: formattedData
      });

      if (result) return { result };
      if (error) return { error };
    } catch (error) {
      fastify.winston.error(error);
    }
  },

  updateLocationOrQuantityHandler: async (req, res) => {
    const {
      changeSource,
      fieldName,
      fieldValue,
      inventoryItemId,
      locationId
    } = req.body;

    const formattedData = `inventoryItemId=${inventoryItemId}&fieldName=${fieldName}&fieldValue=${fieldValue}&locationId=${locationId}&changeSource=${changeSource}`;

    try {
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Inventory/UpdateInventoryItemLocationField",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: formattedData
      });

      if (result) return { result };
      if (error) return { error };
    } catch (error) {
      fastify.winston.error(error);
    }
  }
});
