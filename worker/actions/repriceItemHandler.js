const { linnworks } = require("../../util/linnworks/linnworks.js");

const getInventoryItemPrices = require("../../util/linnworks/helpers/getInventoryItemPrices");
const handleInventoryItemPrice = require("./repricer/handleInventoryItemPrice");
const handleExtendedProperties = require("./repricer/handleExtendedProperties");
const adjustTemplatesInstant = require("../../util/linnworks/helpers/AdjustTemplatesInstant");

const { REPRICE_ITEM } = require("../../util/auditLog/logActionTypes");
const { LINNWORKS } = require("../../util/auditLog/logResourceTypes");
const auditLogger = require("../../util/auditLog/auditLoggerWorker");

const {
  repriceItemStrategy,
} = require("../../util/linnworks/helpers/repricing/repriceItemStrategy");

const repriceItemHandler = async (message) => {
  let _result,
    _error = false;
  const { pkStockItemID, ItemTitle } = message;
  try {
    if (!pkStockItemID) throw "No pkStockItemID on message";
    //get our prices
    const prices = await getInventoryItemPrices(pkStockItemID);
    if (prices.pricesError) throw prices.pricesError;
    //with pricesResult
    if (prices.pricesResult) {
      //get 1st Starting Price we find then rePrice
      const priceSet = prices.pricesResult
        .filter((item) => item.Tag == "Start")
        .shift();
      const newPrice = repriceItemStrategy(priceSet.Price);
      if (!newPrice) throw "repriceItemHandler() returned FALSE";

      //Handle Item Prices
      const { invPriceResult, invPriceError } = await handleInventoryItemPrice(
        pkStockItemID,
        newPrice
      );
      if (invPriceError) throw "handleInventoryItemPrice() " + invPriceError;

      //Handle Extended Properties Section for LastPrice LastPriced
      const result = await handleExtendedProperties(pkStockItemID, newPrice);
      if (!result) throw "handleExtendedProperties() was false";
      //Adjust Ebay Template
      const { adjustResult, adjustError } = await adjustTemplatesInstant(
        pkStockItemID
      );
      if (adjustError) throw adjustError;
      if (adjustResult)
        linnworks.logger.debug("Success: Item Repriced Completed!");
    }
  } catch (e) {
    _error = e;
    linnworks.logger.error(e);
  } finally {
    await auditLogger.log(
      REPRICE_ITEM,
      -1,
      pkStockItemID,
      LINNWORKS,
      JSON.stringify({ _error, title: ItemTitle, _result })
    );
    if (_error) return false;
    return true;
  }
};

module.exports = { repriceItemHandler };
