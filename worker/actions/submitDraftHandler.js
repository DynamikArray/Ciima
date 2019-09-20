const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

const { amqp } = require("../../util/amqp/amqpConn.js");
const { linnworks } = require("../../util/linnworks/linnworks.js");
const draftHelper = require("../../util/ciima/draftHelper.js");
const { PENDING, ERROR } = require("../../util/ciima/draftStatusCode.js");

const handleErrorStatus = async (draft = false, error) => {
  await draftHelper.updateDraftStatus(draft.id, ERROR, JSON.stringify(error));
  logger.error(error);
};

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

const submitDraftHandler = async (message, callback) => {
  try {
    logger.debug("listDrafHandler called");
    const draft = message.data;

    //update draft as processing
    const statusUpdated = await draftHelper.updateDraftStatus(
      draft.id,
      PENDING
    );

    if (statusUpdated) {
      //add item
      const { result, error } = await addInventoryItem(draft);

      //With an inserted item
      if (result && !error) {
        console.log(result);
        //process rest of message
        //Add images
        //Add extended properties
        //item was added now add the rest
        //AddItemLocations
        //AddImagesToInventoryItem
        //AddProductIdentifiers
      }
      //error inserting item
      if (!result && error) handleErrorStatus(draft, error);
    }
    //handle amqp NACK'ing
    callback(null, false);
  } catch (err) {
    handleErrorStatus(false, err);
  }
}; //end messageHandler

module.exports = { submitDraftHandler };
