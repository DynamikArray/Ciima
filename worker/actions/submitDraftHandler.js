const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

const { amqp } = require("../../util/amqp/amqpConn.js");
const { linnworks } = require("../../util/linnworks/linnworks.js");
const draftHelper = require("../../util/ciima/draftHelper.js");

const {
  PENDING,
  SUBMITTED,
  ERROR
} = require("../../util/ciima/draftStatusCode.js");

const handleStatusUpdate = async (draftId, msg, level = ERROR) => {
  const jsonMsg = JSON.stringify(msg);
  await draftHelper.updateDraftStatus(draftId, level, jsonMsg);
  if (level == ERROR) logger.error(jsonMsg);
  logger.debug(jsonMsg);
};

/*
request = {
  ItemNumber: "sample string 1",
  StockItemId: "2738d11a-eea3-4276-99ed-603775849347",
  IsMain: true,
  ImageUrl: "sample string 4"
};
*/
//StockItemId, ItemNumber, ImageUrl, isMain

/**
 * [addImage description]
 * @param  {[type]}  imageProps [description]
 * @return {Promise}            [description]
 */
const addImage = async (draftId, imageProps) => {
  const { StockItemId, ItemNumber, ImageUrl, isMain } = imageProps;
  const formattedData = `request=${JSON.stringify(imageProps)}`;

  try {
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/AddImageToInventoryItem",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: formattedData
    });

    if (result) return { result };
    if (error) return { error };
  } catch (error) {
    handleStatusUpdate(draftId, error, ERROR);
  }
};

const cleanImagePath = imageUrl => {
  const str = imageUrl.replace("’", "'");
  return str;
};

/**
 * [addInventoryImages description]
 * @param  {[type]}  StockItemId [description]
 * @param  {[type]}  ItemNumber  [description]
 * @param  {[type]}  draft       [description]
 * @return {Promise}             [description]
 */
const addInventoryImages = async (StockItemId, ItemNumber, draft) => {
  //handle submitting the inventory images
  const otherImages = draft.other_images;
  if (otherImages.length > 0) {
    const results = [];
    for (let img of otherImages) {
      const cleanedPath = cleanImagePath(img.imageUrl);
      //format image string
      const ImageUrl = encodeURI(`https://searchlightcomics.com${cleanedPath}`);
      const isMain = false;
      const { result, error } = await addImage(draft.id, {
        StockItemId,
        ItemNumber,
        ImageUrl,
        isMain
      });
      if (result) results.push({ result: true });
      if (error) results.push({ error });
    }

    var hasError =
      results.filter(function(o) {
        return o.hasOwnProperty("error");
      }).length > 0;

    if (hasError) {
      return { imagesError: results };
    } else {
      return { imagesResult: true };
    }
  }
  return { imagesError: "No Other Images to add to this listing." };
};

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

/**
 * [submitDraftHandler description]
 * @param  {[type]}   message  [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
const submitDraftHandler = async (message, callback) => {
  logger.debug("listDrafHandler called");
  const draft = message.data;

  try {
    //update draft as processing
    const statusUpdated = await draftHelper.updateDraftStatus(
      draft.id,
      PENDING
    );
    //
    if (statusUpdated) {
      const { result, error } = await addInventoryItem(draft);
      if (result && !error) {
        //Add extended properties
        //item was added now add the rest
        //AddItemLocations
        //AddImagesToInventoryItem
        //AddProductIdentifiers

        //lastly add images
        //With an inserted item grabs its identifiers
        logger.debug("Inventory Item added adding images next.");
        const StockItemId = result.fkStockItemId;
        const ItemNumber = result.ItemNumber;
        //add images
        const { imagesResult, imagesError } = await addInventoryImages(
          StockItemId,
          ItemNumber,
          draft
        );

        //IMAGES SAVED
        if (imagesResult && !imagesError) {
          handleStatusUpdate(draft.id, imagesResult, SUBMITTED);
        }

        //IMAGES DIDNT SAVE
        if (!imagesResult && imagesError) {
          handleStatusUpdate(draft.id, imagesError, ERROR);
        }
      }

      //error inserting item
      if (!result && error) handleStatusUpdate(draft.id, error, ERROR);
    }
    //handle amqp NACK'ing
    callback(null, false);
  } catch (err) {
    handleStatusUpdate(draft.id, err, ERROR);
  }
}; //end messageHandler

module.exports = { submitDraftHandler };
