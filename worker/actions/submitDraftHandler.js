const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

const { amqp } = require("../../util/amqp/amqpConn.js");
const { linnworks } = require("../../util/linnworks/linnworks.js");
const draftHelper = require("../../util/ciima/draftHelper.js");

const cleanImagePath = require("../../util/linnworks/helpers/cleanImagePath.js");
const handleStatusUpdate = require("../../util/linnworks/helpers/handleStatusUpdate.js");
const addInventoryItem = require("../../util/linnworks/helpers/addInventoryItem.js");
const addImage = require("../../util/linnworks/helpers/addImage.js");
const addExtendedProperties = require("../../util/linnworks/helpers/addExtendedProperties.js");
const addInventoryPrices = require("../../util/linnworks/helpers/addInventoryPrices.js");
const updateInventoryLocation = require("../../util/linnworks/helpers/updateInventoryLocation.js");
const addInventoryImages = require("../../util/linnworks/helpers/addInventoryImages.js");

const {
  PENDING,
  SUBMITTED,
  ERROR
} = require("../../util/ciima/draftStatusCode.js");

/**
 * [submitDraftHandler description]
 * @param  {[type]}   message  [description]
 * @param  {Function} callback [description]
 * @return {Promise}           [description]
 */
const submitDraftHandler = async (message, callback) => {
  logger.debug("listDrafHandler called", message);
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

        //inventoryPrices
        const { pricesResult, pricesError } = await addInventoryPrices(
          StockItemId,
          ItemNumber,
          draft
        );
        // extended Properties didnt Save
        if (!pricesResult && pricesError)
          handleStatusUpdate(draft.id, pricesError, ERROR);

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
      if (!result && error) {
        handleStatusUpdate(draft.id, error, ERROR);
      }
    }

    if (!statusUpdated) {
      logger.debug("Unable to update draft status");
    }
  } catch (err) {
    handleStatusUpdate(draft.id, err, ERROR);
  } finally {
    //handle amqp NACK'ing
    callback(null, false);
  }
}; //end messageHandler

module.exports = { submitDraftHandler };
