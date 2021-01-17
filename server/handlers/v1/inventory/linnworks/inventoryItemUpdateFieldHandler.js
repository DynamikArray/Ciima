const { LINNWORKS } = require("../../../../../util/auditLog/logResourceTypes");
const { UPDATE_ITEM_FIELD } = require("../../../../../util/auditLog/logActionTypes");

module.exports = (fastify) => ({
  updateFieldHandler: async (req, res) => {
    let urlEndpoint = false;
    let formattedData = false;
    let enumField = false;

    const { changeSource, fieldName, fieldValue, inventoryItemId, locationId } = req.body;

    switch (fieldName) {
      case "ItemTitle":
        enumField = 1;
        formattedData = `inventoryItemId=${inventoryItemId}&fieldName=${enumField}&fieldValue=${fieldValue}`;
        urlEndpoint = "UpdateInventoryItemField";
        break;
      case "BinRackNumber":
        enumField = 13;
        formattedData = `inventoryItemId=${inventoryItemId}&fieldName=${enumField}&fieldValue=${fieldValue}&locationId=${locationId}&changeSource=${changeSource}`;
        urlEndpoint = "UpdateInventoryItemLocationField";
        break;
      case "Quantity":
        enumField = 10;
        formattedData = `inventoryItemId=${inventoryItemId}&fieldName=${enumField}&fieldValue=${fieldValue}&locationId=${locationId}&changeSource=${changeSource}`;
        urlEndpoint = "UpdateInventoryItemLocationField";
        break;
    }

    try {
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: `Inventory/${urlEndpoint}`,
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: formattedData,
      });

      if (result && !error) return { result };
      if (error && !result) {
        localErrorHandler(error);
        return { error };
      }
    } catch (error) {
      localErrorHandler(error);
    } finally {
      fastify.auditLogger.log(
        UPDATE_ITEM_FIELD,
        req.user.id,
        inventoryItemId,
        LINNWORKS,
        JSON.stringify({ fieldName, fieldValue })
      );
    }

    function localErrorHandler(error) {
      fastify.winston.error(JSON.stringify({ method: "updateFieldHandler", error: error }));
    }
  },
});
