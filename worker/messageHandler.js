const { logger } = require("../shared/winston.js");

const { SUBMIT_DRAFT } = require("../shared/queueActionsList.js");
const { listDraftHandler } = require("./actions/listDraftHandler.js");

const messageHandler = (message, callback) => {
  logger.info("Incoming message");

  const { action } = message;
  if (action) {
    switch (action) {
      case SUBMIT_DRAFT:
        listDraftHandler(message, callback);
        break;
      default:
        callback("MESSAGE_NOT_HANDLED", false);
        break;
    }
  } else {
    logger.warn("Message with no action supplied", message);
    callback("No action supplied", false);
  }
};

module.exports = { messageHandler };
