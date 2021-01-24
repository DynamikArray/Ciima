const { LINNWORKS } = require("../../../../../util/auditLog/logResourceTypes");
const { UPDATE_PRICE_FIELD } = require("../../../../../util/auditLog/logActionTypes");

module.exports = (fastify) => ({
  updatePriceHandler: async (req, res) => {
    let urlEndpoint = false;
    let formattedData = false;
    let enumField = false;
    const { inventoryItemId, fieldName, fieldValue, priceId } = req.body;

    switch (fieldName) {
      case "RetailPrice":
        enumField = 3;
        formattedData = `inventoryItemId=${inventoryItemId}&fieldName=${enumField}&fieldValue=${fieldValue}`;
        urlEndpoint = "UpdateInventoryItemField";
        return await handleRetailPrice(urlEndpoint, formattedData);
        //call the updateField methods
        //and call same methods as by tag but for the null value version somehow or get its proper id
        break;
      case "StartPrice":
        console.log("Handle start price field update for", fieldName);
        break;
      case "DeclinePrice":
        console.log("Handle decline price update for", fieldName);
        break;
      default:
        console.log("Price field not defined");
    }

    async function handleRetailPrice(urlEndpoint, formattedData) {
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
        writeLogEntry(req.user.id, inventoryItemId, { fieldName, fieldValue });
      }
    }

    async function handleStartPrice() {}
    async function handleDeclinePrice() {}
    async function handleListingPrice() {}

    function writeLogEntry(userId, itemId, { fieldName, fieldValue }) {
      fastify.auditLogger.log(UPDATE_PRICE_FIELD, userId, itemId, LINNWORKS, JSON.stringify({ fieldName, fieldValue }));
    }

    function localErrorHandler(error) {
      fastify.winston.error(JSON.stringify({ method: "updateFieldHandler", error: error }));
    }
  },
});
