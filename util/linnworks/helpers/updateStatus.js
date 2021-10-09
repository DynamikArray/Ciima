const { serializeError } = require("serialize-error");

const draftHelper = require("../../ciima/draftHelper.js");
const { PENDING, SUBMITTED, ERROR } = require("../../ciima/draftStatusCode.js");

module.exports = (logger) => ({
  /**
   * [updateStatus description]
   * @param  {number}  draftId       the draftId to be logged in the db
   * @param  {string/object}  msg
   * @param  {string}  [level=ERROR] error level
   * @return {Promise}               [description]
   */
  updateStatus: async (draftId, msg, level = ERROR) => {
    const jsonMsg = JSON.stringify(serializeError(msg));
    await draftHelper.updateDraftStatus(draftId, level, jsonMsg);
    if (jsonMsg) {
      if (level === ERROR) {
        logger.error(jsonMsg);
      } else {
        logger.debug(jsonMsg);
      }
    }
  },
});
