const mysqlConnPool = require("../../mysql/mysqlConnPool.js");
const { PENDING, SUBMITTED, ERROR } = require("../../ciima/draftStatusCode.js");

const updateMainImage = async (draftId, image) => {
  try {
    const query = `UPDATE slc_drafts SET main_image = ? WHERE id = ?`;
    const results = await mysqlConnPool.query(query, [image, draftId]);

    if (results.affectedRows === 1) {
      logger.debug("updateMainImage results", JSON.stringify(results));
      return true;
    }
    return false;
  } catch (err) {
    //loggger.error(err);
    return false;
  }
};

const updateOtherImages = async (draftId, images) => {
  try {
    const query = `UPDATE slc_drafts SET other_images = ? WHERE id = ?`;
    const results = await mysqlConnPool.query(query, [
      JSON.stringify(images),
      draftId
    ]);

    if (results.affectedRows === 1) {
      logger.debug("updateOtherImages results", JSON.stringify(results));
      return true;
    }
    return false;
  } catch (err) {
    //logger.error(err);
    return false;
  }
};

module.exports = { updateMainImage, updateOtherImages };
