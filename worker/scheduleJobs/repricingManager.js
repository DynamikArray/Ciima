const logger = require("../../util/winston/winston.js")({ hostname: "Worker" });
const getItems = require("./repricingManager/getItems");

const publishMessage = require("../../util/amqp/publishMessage.js");
const { REPRICE_ITEM } = require("../../util/amqp/queueActionsList.js");

const repricingManager = async () => {
  logger.info("START repricingManager()");

  const { result, error } = await getItems();
  if (error && !result) return error;
  if (result && !error) {
    logger.debug(`Items needing repricing count ${result.length} `);

    const items = result.map((item, x) => {
      try {
        const { pkStockItemID, ItemTitle } = item;
        const payload = JSON.stringify({
          action: REPRICE_ITEM,
          data: { pkStockItemID, ItemTitle },
        });
        publishMessage(payload);

        logger.debug("Published Payload", JSON.stringify(payload));

        return result;
      } catch (e) {
        throw e;
      }
    });
  }

  logger.info("END repricingManager()");
};

module.exports = { repricingManager };
