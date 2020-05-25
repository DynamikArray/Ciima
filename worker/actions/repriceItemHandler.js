const { linnworks } = require("../../util/linnworks/linnworks.js");

const getInventoryItemPrices = require("../../util/linnworks/helpers/getInventoryItemPrices");

const {
  repriceItemStrategy
} = require("../../util/linnworks/helpers/repricing/repriceItemStrategy");

const repriceItemHandler = async message => {
  try {
    const { pkStockItemID } = message;
    if (!pkStockItemID) throw "No pkStockItemID on message";
    //get our prices
    const prices = await getInventoryItemPrices(pkStockItemID);
    if (prices.pricesError) throw prices.pricesError;
    //with pricesResult
    if (prices.pricesResult) {
      //get 1st Starting Price we find then rePrice
      const priceSet = prices.pricesResult
        .filter(item => item.Tag == "Start")
        .shift();
      const newPrice = repriceItemStrategy(priceSet.Price);
      if (!newPrice) throw "repriceItemHandler() returned FALSE";

      console.log("New Price:", newPrice);
      //updateinventoryPrice
      //AdjustEbayTemplateInstant

      //GetInventoryExtendedProperties
      //UpdateInventoryExtendedProperies for LastPrice and LastPriced
    }
  } catch (e) {
    linnworks.logger.error(e);
  } finally {
    return true;
  }
};

module.exports = { repriceItemHandler };
