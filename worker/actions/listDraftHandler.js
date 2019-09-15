const { logger } = require("../../shared/winston.js");
const { linnworks } = require("../util/linnworks.js");

const listDraftHandler = async (message, callback) => {
  logger.info("listDrafHandler called");

  const result = await linnworks.makeApiCall({
    method: "POST",
    url: "Inventory/AddInventoryItem",
    headers: ["Content-Type: application/x-www-form-urlencoded"],
    data: {
      inventoryItem: {
        ItemNumber: "sample string 1",
        ItemTitle: "sample string 2",
        BarcodeNumber: "sample string 3",
        PurchasePrice: 4.1,
        RetailPrice: 1.1,
        Quantity: 5,
        TaxRate: 6.1,
        StockItemId: "c354da2a-d7d4-11e9-8a34-2a2ae2dbcce4"
      }
    }
  });

  //// TODO: handle this better or log it better if we feel like we are losing messages
  if (!result) {
    callback(false, false);
  }
  //Should be the successfully result from linnworks
  if (result) {
    callback(false, false);
  }
};

module.exports = { listDraftHandler };
