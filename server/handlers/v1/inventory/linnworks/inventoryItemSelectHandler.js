const selectItemQuery = require("../../../../../util/linnworks/queries/inventory/selectInventoryItemDetails");
const getInventoryItemPrices = require("../../../../../util/linnworks/helpers/getInventoryItemPrices");
const selectInventoryItemEbayListings = require("../../../../../util/linnworks/queries/inventory/selectInventoryItemEbayListings");
const selectInventoryItemOrderHistory = require("../../../../../util/linnworks/queries/inventory/selectInventoryItemOrderHistory");

//const { extractErrorMessages } = require("../../../../../util/linnworks/helpers/extractErrorMessages");

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
      if (result && !result.IsError) return { result: result.Results };
      if (error) return { error: error };
    }

    async function getItemRepricingLog(pkStockItemID) {
      const query =
        "SELECT * FROM slc_repricing_log WHERE pkStockItemID = ? ORDER BY dateUpdated DESC";
      try {
        const [rows, fields] = await fastify.mysql.query(query, pkStockItemID);

        if (rows) return { result: rows };
        if (!rows) return { result: [] };
      } catch (e) {
        if (e) fastify.winston.error(e);
        return { result: [] };
      }
    }

    async function getItemOrderHistory(pkStockItemID) {
      const data = selectInventoryItemOrderHistory(pkStockItemID);
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });
      if (result && !result.IsError) return { result: result.Results };
      if (error) return { error: error };
    }
    //
    /* -------- End Item Pieces Async Methods --------- */

    /* --------- start selectHandler: async(res, res) ------------- */
    //
    const { pkStockItemID } = req.body;

    const itemPieces = await Promise.all([
      getItemDetails(pkStockItemID),
      getItemPrices(pkStockItemID),
      getItemEbayListings(pkStockItemID),
      getItemRepricingLog(pkStockItemID),
      getItemOrderHistory(pkStockItemID),
    ]);
    //Validate our response data better
    //
    //We return errors but never check for them
    //
    //Build a good response object
    const inventoryItem = {
      ...itemPieces[0].result,
      prices: itemPieces[1].prices,
      ebayHistory: itemPieces[2].result,
      repricingLog: itemPieces[3].result,
      ordersHistory: itemPieces[4].result,
    };
    return { result: inventoryItem, error: false };
  },
});
