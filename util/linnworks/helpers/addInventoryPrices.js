const { linnworks } = require("../linnworks.js");

module.exports = (logger) => ({
  addInventoryPrices: async (StockItemId, ItemNumber, draft) => {
    const { itemInventoryPrices } = linnworks.formatters;
    let inventoryPrice = false;
    switch (draft.draftType.toUpperCase()) {
      case "LOTS":
        logger.debug("Adding Inventory Prices for Lot Item.");
        inventoryPrice = itemInventoryPrices(
          StockItemId,
          ItemNumber,
          draft.price,
          "Start"
        );
        break;
      case "GTCS":
        logger.debug("Adding Inventory Prices for Gtc Item.");
        if (draft.declinePrice) {
          inventoryPrice = itemInventoryPrices(
            StockItemId,
            ItemNumber,
            draft.declinePrice,
            "DECLINE"
          );
        }
        break;
      default:
        logger.debug("Didnt match a draft types for adding Inventory Prices.");
        return { pricesResult: true };
        break;
    }

    if (inventoryPrice) {
      const { result, error } = await linnworks.makeApiCall({
        method: "POST",
        url: "Inventory/CreateInventoryItemPrices",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: inventoryPrice,
      });

      if (result) return { pricesResult: result };
      if (error) return { pricesError: error };
    }

    /*
    //add listingDescriptions for auctions aka LOTS
    if (draft.draftType.toUpperCase() == "LOTS") {
      logger.debug("Adding Inventory Prices for Lot Item.");
      const { itemInventoryPrices } = linnworks.formatters;
      //setup params for call

      //make api call
      //CreateInventoryItemExtendedProperties
      const { result, error } = await linnworks.makeApiCall({
        method: "POST",
        url: "Inventory/CreateInventoryItemPrices",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: inventoryPrice,
      });

      if (result) return { pricesResult: result };
      if (error) return { pricesError: error };
    }

    return { pricesResult: true };
    */
  },
});
