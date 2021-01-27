module.exports = (fastify) => ({
  addPriceHandler: async (req, res) => {
    const { itemInventoryPrices } = fastify.linnworks.formatters;
    const { inventoryItemId, fieldValue, fieldName } = req.body;
    let inventoryPrice = false;

    switch (fieldName) {
      case "DeclinePrice":
        inventoryPrice = itemInventoryPrices(inventoryItemId, false, fieldValue, "DECLINE");
        break;
      case "StartPrice":
        inventoryPrice = itemInventoryPrices(inventoryItemId, false, fieldValue, "START");
        break;
    }

    if (inventoryPrice) {
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Inventory/CreateInventoryItemPrices",
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: inventoryPrice,
      });

      if (result) return { result, error: false };
      if (error) return { error, result: false };
    }
  },
});
