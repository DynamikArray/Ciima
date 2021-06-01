const { LINNWORKS } = require("../../../../../util/auditLog/logResourceTypes");
const { UPDATE_ITEM_FIELD } = require("../../../../../util/auditLog/logActionTypes");

const getInventoryItemTitles = require("../../../../../util/linnworks/helpers/getInventoryItemTitles");
const updateInventoryItemTitles = require("../../../../../util/linnworks/helpers/updateInventoryItemTitles");

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

      if (result && !error) {
        if (fieldName == "ItemTitle") {
          const { updateTitlesResult, updateTitlesError } = await updateItemTitles(inventoryItemId, fieldValue);
          if (updateTitlesResult && !updateTitlesError) return { result };
          if (!updateTitlesResult && updateTitlesError) return { error: updateTitlesError };
        }
        return { result };
      }

      if (error && !result) {
        localErrorHandler("updateFieldHandler", error);
        return { error };
      }
    } catch (error) {
      localErrorHandler("updateFieldHandler", error);
    } finally {
      fastify.auditLogger.log(
        UPDATE_ITEM_FIELD,
        req.user.id,
        inventoryItemId,
        LINNWORKS,
        JSON.stringify({ fieldName, fieldValue })
      );
    }

    async function updateItemTitles(inventoryItemId, itemTitle) {
      try {
        const { titlesResult, titlesError } = await getInventoryItemTitles(inventoryItemId);
        if (titlesResult && !titlesError) {
          if (titlesResult.length > 1) {
            localErrorHandler("updateItemTitles", "More than 1 title in updateItemTitles for ebay listing titles.");
            return { error: "More than 1 title in updateItemTitles for ebay listing titles." };
          }

          if (titlesResult.length == 1) {
            titlesResult[0].Title = itemTitle;
            return await updateInventoryItemTitles(titlesResult[0], inventoryItemId);
          }

          return { error: "No Listing Titles matched" };
        }
      } catch (updateItemTitlesExeception) {
        console.log("ERROR->", updateItemTitlesExeception);
        localErrorHandler("updateItemTitles", updateItemTitlesExeception);
        return { error: JSON.stringify(updateItemTitlesExeception.message) };
      }
    }

    function localErrorHandler(method, error) {
      fastify.winston.error(JSON.stringify({ method: method, error: error }));
    }
  },
});
