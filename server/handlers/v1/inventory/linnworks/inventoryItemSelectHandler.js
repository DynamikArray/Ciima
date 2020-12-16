const selectItemQuery = require("../../../../../util/linnworks/queries/inventory/selectInventoryItemDetails");
const getInventoryItemPrices = require("../../../../../util/linnworks/helpers/getInventoryItemPrices");
const selectInventoryItemEbayListings = require("../../../../../util/linnworks/queries/inventory/selectInventoryItemEbayListings");
const {
  extractErrorMessages,
} = require("../../../../../util/linnworks/helpers/extractErrorMessages");

module.exports = (fastify) => ({
  selectHandler: async (req, res) => {
    /* -------- Item Pieces Async Methods --------- */
    async function getItemDetails(pkStockItemID) {
      const data = selectItemQuery(pkStockItemID);
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });
      if (!result.IsError) return { result: result.Results[0] };
      if (error) return { error: error };
    }

    async function getItemPrices(pkStockItemID) {
      const { pricesResult, pricesError } = await getInventoryItemPrices(
        pkStockItemID
      );

      if (pricesError && !pricesResult)
        return { prices: [], error: pricesError };
      if (pricesResult && !pricesError)
        return { prices: pricesResult, error: false };
    }

    async function getItemEbayListings(pkStockItemID) {
      const data = selectInventoryItemEbayListings(pkStockItemID);
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });
      if (result && !result.IsError) {
        let formattedResults = extractErrorMessages(result.Results);
        return { result: formattedResults, total: result.TotalResults };
      }

      if (error) return { error: error };
    }

    /* -------- End Item Pieces Async Methods --------- */

    /* --------- start selectHandler: async(res, res) ------------- */
    const { pkStockItemID } = req.body;

    const itemPieces = await Promise.all([
      getItemDetails(pkStockItemID),
      getItemPrices(pkStockItemID),
      getItemEbayListings(pkStockItemID),
    ]);
    //Validate our response data better
    //Build a good response object
    const inventoryItem = {
      ...itemPieces[0].result,
      prices: itemPieces[1].prices,
      ebayHistory: itemPieces[2].result,
    };

    console.log(itemPieces[2].result);

    return { result: inventoryItem, error: false };
  },
});
