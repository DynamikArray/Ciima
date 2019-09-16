const { SUBMIT_DRAFT } = require("../util/amqp/queueActionsList.js");

module.exports = (connection, logger) => ({
  handleMessage: (message, callback) => {
    logger.info("Incoming message");

    //// TODO: there a better way to get this connection object around?
    const { messageHandler } = require("./actions/submitDraftHandler.js")(
      connection,
      logger
    );

    //pull off the action and process out of the payload
    const { action } = message;
    if (action) {
      switch (action) {
        case SUBMIT_DRAFT:
          logger.info(SUBMIT_DRAFT);
          messageHandler(message, callback);
          break;
        default:
          logger.warn("MESSAGE_NOT_HANDLED");
          callback("MESSAGE_NOT_HANDLED", false);
          break;
      }
    } else {
      //no action present, ignore message but log
      logger.warn("Message with no action supplied", message);
      callback("No action supplied", false);
    }
  }
});
