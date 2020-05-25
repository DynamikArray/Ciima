const { linnworks } = require("../linnworks.js");
const getInventoryItemPrices = async pkStockItemID => {
  try {
    const inventoryItem = `inventoryItemId=${pkStockItemID}`;
    //CreateInventoryItemExtendedProperties
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/GetInventoryItemPrices",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: inventoryItem
    });
    if (result) return { pricesResult: result };
    if (error) return { pricesError: error };
  } catch (e) {
    linnworks.logger.error(e);
  } finally {
    //
  }
};
module.exports = getInventoryItemPrices;
