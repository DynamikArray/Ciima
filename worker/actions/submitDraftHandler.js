//const { logger } = require("../../util/winston/winston.js");
const { amqp } = require("../../util/amqp/amqpConn.js");

const { linnworks } = require("../../util/linnworks/linnworks.js");
const draftHelper = require("../../util/ciima/draftHelper.js");

const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

const { PENDING, ERROR } = require("../../util/ciima/draftStatusCode.js");

module.exports = () => ({
  submitDraftHandler: async (message, callback) => {
    try {
      logger.debug("listDrafHandler called");
      const draft = message.data;
      //update draft as processing
      const statusUpdated = await draftHelper.updateDraftStatus(
        draft.id,
        PENDING
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
        //With an inserted item
        if (result) {
          //publish message to insert other piece
          await amqp.connect();
          await amqp.publish("ciima.DEV", {
            action: "DO_THINGS",
            data: { somekey: "somevalue" }
          });

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
        //error inserting item
        if (error) this.handleErrorStatus(err);
      }
      //handle amqp NACK'ing
      callback(null, false);
    } catch (err) {
      this.handleErrorStatus(err);
    }
  }, //end messageHandler

  handleErrorStatus: async error => {
    await draftHelper.updateDraftStatus(draft.id, ERROR, JSON.stringify(error));
    logger.error(error);
  }
});
