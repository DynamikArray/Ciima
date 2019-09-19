const { SUBMIT_DRAFT } = require("../util/amqp/queueActionsList.js");
const logger = require("../util/winston/winston.js")({
  hostname: "Worker"
});

const { submitDraftHandler } = require("./actions/submitDraftHandler.js")();

module.exports = () => ({
  handleMessage: (message, callback) => {
    logger.debug("Incoming message");

    //pull off the action and process out of the payload
    const { action } = message;
    if (action) {
      switch (action) {
        case SUBMIT_DRAFT:
          logger.debug(SUBMIT_DRAFT);
          submitDraftHandler(message, callback);
          break;
        default:
          logger.warn("MESSAGE_NOT_HANDLED");
          callback("MESSAGE_NOT_HANDLED", false);
          break;
      }
    } else {
      //no action present, ignore message but log
      logger.warn("Message with no action supplied" + JSON.stringify(message));
      callback("No action supplied", false);
    }
  }
});
