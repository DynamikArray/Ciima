const { logger } = require("../../util/winston/winston.js");
const { linnworks } = require("../../util/linnworks/linnworks.js");

module.exports = (connection, logger) => ({
  messageHandler: async (message, callback) => {
    logger.info("listDrafHandler called");
    //create GUID for this product

    //build item details formatted correctally
    //
    //  fetch record from db?
    //
    //

    //AddInventoryItem
    const result = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/AddInventoryItem",
      headers: ["Content-Type: application/x-www-form-urlencoded"],
      data: {
        inventoryItem: {}
      }
    });

    //if item is added we can do the next ones

    //AddItemLocations

    //AddImagesToInventoryItem

    //AddProductIdentifiers

    //// TODO: handle this better or log it better if we feel like we are losing messages
    if (!result) {
      callback(false, false);
    }
    //Should be the successfully result from linnworks
    if (result) {
      callback(false, false);
    }
  },
  //
  //
  getDraft: async id => {
    connection;
  }
  //
  //
});
