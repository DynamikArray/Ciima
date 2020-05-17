const { linnworks } = require("../linnworks.js");

/**
 * [addInventoryItem description]
 * @param  {[type]}  draft [description]
 * @return {Promise}       [description]
 */
const addInventoryItem = async draft => {
  //start submitting the draft
  const { newInventoryItem, formattedInventoryItem } = linnworks.formatters;
  const itemData = newInventoryItem(draft);
  const formattedData = formattedInventoryItem(itemData);
  //AddInventoryItem
  const { result, error } = await linnworks.makeApiCall({
    method: "POST",
    url: "Inventory/AddInventoryItem",
    headers: "Content-Type: plain/text",
    data: formattedData
  });

  if (result) {
    const result = {
      fkStockItemId: itemData.StockItemId,
      ItemNumber: itemData.ItemNumber
    };
    return { result };
  }

  if (error) return { error };
};

module.exports = addInventoryItem;
