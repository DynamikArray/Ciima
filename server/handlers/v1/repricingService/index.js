const { REPRICE_ITEM } = require("../../../../util/amqp/queueActionsList.js");

module.exports = (fastify) => ({
  /* pkStockItemID */
  repriceItemByIdHandler: async (req, res) => {
    const { rabbit, winston } = fastify;
    const amqp = require("../../../util/amqpMsgHelper.js")(rabbit, winston);
    const { pkStockItemID, ItemTitle } = req.body;

    const payload = JSON.stringify({
      action: REPRICE_ITEM,
      data: {
        pkStockItemID,
        ItemTitle,
      },
    });

    try {
      const result = await amqp.sendMessage(payload);
      fastify.winston.debug(JSON.stringify(result));

      return result;
    } catch (e) {
      fastify.winston.error(JSON.stringify(e.message));
    }
  },
});
