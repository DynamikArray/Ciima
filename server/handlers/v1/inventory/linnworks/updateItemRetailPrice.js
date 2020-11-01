const { linnworks } = require("../../../../../util/linnworks/linnworks.js");

async function updateItemRetailPrice(inventoryItemId, fieldValue) {
  const formattedData = `inventoryItemId=${inventoryItemId}&fieldName=3&fieldValue=${fieldValue}`;
  return await linnworks.makeApiCall({
    method: "POST",
    url: "Inventory/UpdateInventoryItemField",
    headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
    data: formattedData,
  });
}

module.exports = updateItemRetailPrice;
