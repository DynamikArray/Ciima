const { logger } = require("../../util/winston/winston.js");
const { linnworks } = require("../../util/linnworks/linnworks.js");

module.exports = (connection, logger) => ({
  messageHandler: async (message, callback) => {
    logger.info("listDrafHandler called");

    const draft = message.data;
    const { newInventoryItem } = linnworks.formatters;
    const formattedData = newInventoryItem(draft);

    //AddInventoryItem
    const result = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/AddInventoryItem",
      headers: "Content-Type: plain/text",
      data: formattedData
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
