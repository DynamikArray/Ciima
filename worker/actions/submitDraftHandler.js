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

const locationInfo = {
  StockLocationId: "00000000-0000-0000-0000-000000000000",
  LocationName: "Default"
};

/**
 * [handleStatusUpdate description]
 * @param  {number}  draftId       the draftId to be logged in the db
 * @param  {string/object}  msg
 * @param  {string}  [level=ERROR] error level
 * @return {Promise}               [description]
 */
const handleStatusUpdate = async (draftId, msg, level = ERROR) => {
  const jsonMsg = JSON.stringify(msg);
  await draftHelper.updateDraftStatus(draftId, level, jsonMsg);
  if (jsonMsg) {
    if (level === ERROR) logger.error(jsonMsg);
    logger.debug(jsonMsg);
  }
};

/**
 * cleanImagePath - removes the special charachters from the url names so the json
 * can be passed into mysql or to linnworks or used in url paths
 * @param  {string} imageUrl the imageUrl from our database
 * @return {string}          [description]
 */
const cleanImagePath = imageUrl => {
  const str = imageUrl.replace("’", "'");
  return str;
};

/**
 * [addImage description]
 * @param  {[type]}  imageProps [description]
 * @return {Promise}            [description]
 */
const addImage = async (draftId, imageProps) => {
  //encode the imageUrl
  imageProps.ImageUrl = encodeURIComponent(imageProps.ImageUrl);
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
 * [addExtendedProperties description]
 * @param  {[type]}  StockItemId [description]
 * @param  {[type]}  ItemNumber  [description]
 * @param  {[type]}  draft       [description]
 * @return {Promise}             [description]
 */
const addExtendedProperties = async (StockItemId, ItemNumber, draft) => {
  const { itemExtendedProperties } = linnworks.formatters;
  const extendedProperties = itemExtendedProperties(
    StockItemId,
    ItemNumber,
    draft
  );

  //CreateInventoryItemExtendedProperties
  const { result, error } = await linnworks.makeApiCall({
    method: "POST",
    url: "Inventory/CreateInventoryItemExtendedProperties",
    headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
    data: extendedProperties
  });

  if (result) return { extPropsResult: result };
  if (error) return { extPropsError: error };
  //for each one of these draft properties we have to add an extended property
};

const updateInventoryLocation = async (StockItemId, location) => {
  const inventoryItemLocation = [
    {
      StockLocationId: locationInfo.StockLocationId,
      LocationName: locationInfo.LocationName,
      BinRack: location,
      StockItemId
    }
  ];
  const formattedLocation = `itemLocations=${JSON.stringify(
    inventoryItemLocation
  )}`;

  //CreateInventoryItemExtendedProperties
  const { result, error } = await linnworks.makeApiCall({
    method: "POST",
    url: "Inventory/UpdateItemLocations ",
    headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
    data: formattedLocation
  });

  if (result && !error) return { invResult: true };
  if (error && !result) return { invError: error };
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
  let hasErrors = [];

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
        logger.debug("Inventory Item added adding images next.");

        const StockItemId = result.fkStockItemId;
        const ItemNumber = result.ItemNumber;

        //
        //  Main Image
        const addImageResp = await addImage(draft.id, {
          StockItemId,
          ItemNumber,
          ImageUrl: draft.main_image,
          isMain: true
        });
        //  Main Image Didnt Save
        if (addImageResp.error) hasErrors.push(addImageResp.error);

        //
        //Add extended properties
        const { extPropsResult, extPropsError } = await addExtendedProperties(
          StockItemId,
          ItemNumber,
          draft
        );
        // extended Properties didnt Save
        if (!extPropsResult && extPropsError)
          handleStatusUpdate(draft.id, extPropsError, ERROR);

        //
        //Update Inventory Location
        const { invResult, invError } = await updateInventoryLocation(
          StockItemId,
          draft.locationCode
        );
        // Inventory Location didnt Save
        if (!invResult && invError)
          handleStatusUpdate(draft.id, invError, ERROR);

        //
        //See if we have other images to send
        if (draft.other_images.length > 0) {
          //  Add Other Images
          const { imagesResult, imagesError } = await addInventoryImages(
            StockItemId,
            ItemNumber,
            draft
          );
          //IMAGES DIDNT SAVE
          if (!imagesResult && imagesError) hasErrors.push(imagesError);
        } //end other_image > 0

        //
        //Error check for any errors and log them
        if (hasErrors.length > 0) {
          handleStatusUpdate(draft.id, hasErrors, ERROR);
        } else {
          handleStatusUpdate(draft.id, "Draft Submitted!", SUBMITTED);
        }
      }

      //
      //error inserting main inventory item
      if (!result && error) handleStatusUpdate(draft.id, error, ERROR);
    }
  } catch (err) {
    handleStatusUpdate(draft.id, err, ERROR);
  } finally {
    //handle amqp NACK'ing
    callback(null, false);
  }
}; //end messageHandler

module.exports = { submitDraftHandler };
