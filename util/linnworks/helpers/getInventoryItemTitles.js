const { linnworks } = require("../linnworks.js");
const getInventoryItemTitles = async (pkStockItemID) => {
  try {
    const inventoryItem = `inventoryItemId=${pkStockItemID}`;
    //CreateInventoryItemExtendedProperties
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/GetInventoryItemTitles",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: inventoryItem,
    });
    if (result) return { titlesResult: result, titlesError: false };
    if (error) return { titlesError: error, titlesResult: false };
  } catch (e) {
    linnworks.logger.error(e);
    return { titlesError: e.message, titlesResult: false };
  } finally {
    //
  }
};
module.exports = getInventoryItemTitles;
