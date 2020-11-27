const {
  SUBMIT_DRAFT,
  REPRICE_ITEM,
} = require("../util/amqp/queueActionsList.js");

const logger = require("../util/winston/winston.js")({
  hostname: "Worker",
});

const { submitDraftHandler } = require("./actions/submitDraftHandler.js");
const {
  repriceItemHandler,
} = require("./actions/repricer/repriceItemHandler.js");

const messageHandler = async (message) => {
  logger.debug("Incoming message");
  //pull off the action and process out of the payload
  const { action } = message;
  if (action) {
    switch (action) {
      case SUBMIT_DRAFT:
        logger.debug(SUBMIT_DRAFT);
        return await submitDraftHandler(message);
        break;
      case REPRICE_ITEM:
        logger.debug(`${REPRICE_ITEM} ${JSON.stringify(message)}`);
        return await repriceItemHandler(message);
        break;
      default:
        logger.warn("MESSAGE_NOT_HANDLED | " + JSON.stringify(message));
        return "MESSAGE_NOT_HANDLED";
        break;
    }
  } else {
    //no action present, ignore message but log
    logger.warn("Message with no action supplied" + JSON.stringify(message));
    return "No action supplied", false;
  }
};

module.exports = { messageHandler };
