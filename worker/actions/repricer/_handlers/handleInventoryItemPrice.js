const { format } = require("date-fns");
const { linnworks } = require("../../../../util/linnworks/linnworks.js");

const getInventoryItemPrices = require("../../../../util/linnworks/helpers/getInventoryItemPrices");
const updateInventoryItemPrices = require("../../../../util/linnworks/helpers/updateInventoryItemPrices");

const handleInventoryItemPrice = async (pkStockItemID, newPrice) => {
  let _result,
    _error = false;

  try {
    const { pricesResult, pricesError } = await getInventoryItemPrices(
      pkStockItemID
    );
    if (pricesError) throw "getInventoryItemPrices() error:" + pricesError;
    if (pricesResult) {
      const startPrice = pricesResult
        .filter((item) => item.Tag == "Start")
        .shift();

      if (!startPrice)
        throw "No Start price found on getInventoryItemPrices filter";

      //Update the new price properties
      startPrice.Price = newPrice;
      startPrice.UpdateStatus = 0;

      //update on linnworks
      const { invPriceResult, invPriceError } = await updateInventoryItemPrices(
        startPrice,
        pkStockItemID
      );
      if (invPriceError) throw invPriceError;
      if (invPriceResult) _result = invPriceResult;
    }
  } catch (e) {
    _error = e;
    linnworks.logger.error(e);
  } finally {
    return { invPriceResult: _result, invPriceError: _error };
  }
};

module.exports = handleInventoryItemPrice;
