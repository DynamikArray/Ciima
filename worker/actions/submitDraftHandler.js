const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

const {
  updateStatus
} = require("../../util/linnworks/helpers/updateStatus.js")(logger);

const { linnworks } = require("../../util/linnworks/linnworks.js");
const draftHelper = require("../../util/ciima/draftHelper.js");

const cleanImagePath = require("../../util/linnworks/helpers/cleanImagePath.js");

const addInventoryItem = require("../../util/linnworks/helpers/addInventoryItem.js");
const addImage = require("../../util/linnworks/helpers/addImage.js");
const addExtendedProperties = require("../../util/linnworks/helpers/addExtendedProperties.js");
const {
  addInventoryPrices
} = require("../../util/linnworks/helpers/addInventoryPrices.js")(logger);
const updateInventoryLocation = require("../../util/linnworks/helpers/updateInventoryLocation.js");
const addInventoryImages = require("../../util/linnworks/helpers/addInventoryImages.js");

const {
  updateMainImage,
  updateOtherImages
} = require("../../util/linnworks/helpers/updateImages.js");

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
        const { imageResult, imageError } = await addImage(draft.id, {
          StockItemId,
          ItemNumber,
          ImageUrl: draft.main_image,
          isMain: true
        });

        if (imageResult) await updateMainImage(draft.id, imageResult.ImageUrl);
        //  Main Image Didnt Save
        if (imageError) hasErrors.push(imageError);

        //Add extended properties
        const { extPropsResult, extPropsError } = await addExtendedProperties(
          StockItemId,
          ItemNumber,
          draft
        );
        // extended Properties didnt Save
        if (!extPropsResult && extPropsError)
          updateStatus(draft.id, extPropsError, ERROR);

        //inventoryPrices
        const { pricesResult, pricesError } = await addInventoryPrices(
          StockItemId,
          ItemNumber,
          draft
        );
        // extended Properties didnt Save
        if (!pricesResult && pricesError)
          updateStatus(draft.id, pricesError, ERROR);

        //
        //Update Inventory Location
        const { invResult, invError } = await updateInventoryLocation(
          StockItemId,
          draft.locationCode
        );
        // Inventory Location didnt Save
        if (!invResult && invError) updateStatus(draft.id, invError, ERROR);

        //See if we have other images to send
        if (draft.other_images.length > 0) {
          const { imagesResult, imagesError } = await addInventoryImages(
            StockItemId,
            ItemNumber,
            draft
          );
          if (imagesResult) await updateOtherImages(draft.id, imagesResult);
          if (imagesError) hasErrors.push(imagesError);
        } //end other_image > 0

        //Error check for any errors and log them
        if (hasErrors.length > 0) {
          updateStatus(draft.id, hasErrors, ERROR);
        } else {
          updateStatus(draft.id, "Draft Submitted!", SUBMITTED);
        }
      }

      //error inserting main inventory item
      if (!result && error) updateStatus(draft.id, error, ERROR);
    }

    if (!statusUpdated) logger.debug("Unable to update draft status");
  } catch (err) {
    updateStatus(draft.id, err, ERROR);
  } finally {
    //handle amqp NACK'ing
    return;
  }
}; //end messageHandler

module.exports = { submitDraftHandler };
