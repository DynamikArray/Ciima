const cleanImagePath = require("../../linnworks/helpers/cleanImagePath.js");
const addImage = require("./addImage.js");

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

      //// HACK: for dealing with our images vs cloudinarys or full urls
      let ImageUrl = encodeURI(cleanedPath);
      if (cleanedPath.startsWith("/zCustomApps/")) {
        ImageUrl = encodeURI(`https://searchlightcomics.com${cleanedPath}`);
      }

      const isMain = false;
      const { imageResult, imageError } = await addImage(draft.id, {
        StockItemId,
        ItemNumber,
        ImageUrl,
        isMain
      });
      if (imageResult) results.push({ imageUrl: imageResult.ImageUrl });
      if (imageError) results.push({ error: imageError });
    }

    var hasError =
      results.filter(function(o) {
        return o.hasOwnProperty("error");
      }).length > 0;

    if (hasError) {
      return { imagesError: results };
    } else {
      return { imagesResult: results };
    }
  }
  return { imagesError: "No Other Images to add to this listing." };
};

module.exports = addInventoryImages;
