//const { logger } = require("../../util/winston/winston.js");
const { linnworks } = require("../../util/linnworks/linnworks.js");
const draftHelper = require("../../util/ciima/draftHelper.js");

const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

const statusCode = require("../../util/ciima/draftStatusCode.js");

module.exports = () => ({
  submitDraftHandler: async (message, callback) => {
    try {
      logger.debug("listDrafHandler called");
      const draft = message.data;
      //update draft as processing
      const statusUpdated = await draftHelper.updateDraftStatus(
        draft.id,
        statusCode.SUBMITTED
      );

      if (statusUpdated) {
        //start submitting the draft
        const { newInventoryItem } = linnworks.formatters;
        const formattedData = newInventoryItem(draft);

        //AddInventoryItem
        const { result, error } = await linnworks.makeApiCall({
          method: "POST",
          url: "Inventory/AddInventoryItem",
          headers: "Content-Type: plain/text",
          data: formattedData
        });
        if (result) {
          console.log(
            "Item added to linnworks now process the rest of the details"
          );
          //process rest of message
          //Add images
          //Add extended properties
          //item was added now add the rest
          //AddItemLocations
          //AddImagesToInventoryItem
          //AddProductIdentifiers
        }

        if (error) {
          logger.debug("Item Not Added", error, draft);
        }
      }
      callback(null, false);
    } catch (err) {
      logger.error(err);
    }
  } //end messageHandler
});
