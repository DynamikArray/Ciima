const { linnworks } = require("../linnworks.js");

module.exports = logger => ({
  addInventoryPrices: async (StockItemId, ItemNumber, draft) => {
    //add listingDescriptions for auctions aka LOTS
    if (draft.draftType.toUpperCase() == "LOTS") {
      logger.debug("Adding Inventory Prices for Lot Item.");
      const { itemInventoryPrices } = linnworks.formatters;
      //setup params for call
      const inventoryPrice = itemInventoryPrices(
        StockItemId,
        ItemNumber,
        draft
      );
      //make api call
      //CreateInventoryItemExtendedProperties
      const { result, error } = await linnworks.makeApiCall({
        method: "POST",
        url: "Inventory/CreateInventoryItemPrices",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: inventoryPrice
      });

      if (result) return { pricesResult: result };
      if (error) return { pricesError: error };
    }
    return { pricesResult: true };
  }
});
