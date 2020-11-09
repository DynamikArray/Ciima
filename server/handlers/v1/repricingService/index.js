const { REPRICE_ITEM } = require("../../../../util/amqp/queueActionsList.js");
const {
  getRepricingItemsList,
} = require("../../../../util/linnworks/queries/repricer/lots/getRepricingItemsList.js");

module.exports = (fastify) => ({
  getItemsListHandler: async (req, res) => {
    try {
      //send whatever params are required for the query to be built?
      const { repricedItems } = req.body;
      const data = getRepricingItemsList(repricedItems);

      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });

      if (result && !result.IsError)
        return { result: result.Results, total: result.TotalResults };
      if (error) return { error: error };
    } catch (e) {
      throw e;
    }
  },

  /* pkStockItemID */
  repriceItemByIdHandler: async (req, res) => {
    const { rabbit, winston } = fastify;
    const amqp = require("../../../util/amqpMsgHelper.js")(rabbit, winston);
    const { pkStockItemID, ItemTitle } = req.body;

    const payload = JSON.stringify({
      action: REPRICE_ITEM,
      data: { pkStockItemID, ItemTitle },
    });

    try {
      const result = await amqp.sendMessage(payload);
      fastify.winston.debug(JSON.stringify(result));

      return result;
    } catch (e) {
      throw e;
    }
  },
});
