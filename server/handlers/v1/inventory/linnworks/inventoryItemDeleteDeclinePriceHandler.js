const { DELETE_DECLINE_PRICE_FIELD } = require("../../../../../util/auditLog/logActionTypes");
const { LINNWORKS } = require("../../../../../util/auditLog/logResourceTypes");

module.exports = (fastify) => ({
  deleteDeclinePriceHandler: async (req, res) => {
    let _result,
      _error = false;

    const { pkStockItemID, inventoryItemPriceId } = req.body;
    const formattedData = `inventoryItemPriceIds=["${inventoryItemPriceId}"]`;

    try {
      return await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Inventory/DeleteInventoryItemPrices",
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: formattedData,
      });

      if (result && !error) return { result: "success" };

      if (error && !result) {
        fastify.winston.error(JSON.stringify({ method: "deleteDeclinePriceHandler", error }));
        return { error };
      }
    } catch (deleteDeclinePriceHandlerException) {
      fastify.winston.error(
        JSON.stringify({ deleteDeclinePriceHandlerException: deleteDeclinePriceHandlerException.message })
      );
    } finally {
      fastify.auditLogger.log(
        DELETE_DECLINE_PRICE_FIELD,
        req.user.id,
        pkStockItemID,
        LINNWORKS,
        JSON.stringify({ message: "Decline Price Deleted" })
      );
    }
  },
});
