const { linnworks } = require("../linnworks.js");
const handleStatusUpdate = require("./handleStatusUpdate.js");

const { PENDING, SUBMITTED, ERROR } = require("../../ciima/draftStatusCode.js");

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

module.exports = addImage;
