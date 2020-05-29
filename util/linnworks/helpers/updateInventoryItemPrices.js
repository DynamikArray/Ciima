const {
  UPDATE_INVENTORY_ITEM_PRICES,
} = require("../../auditLog/logActionTypes");
const { LINNWORKS } = require("../../auditLog/logResourceTypes");

const auditLogger = require("../../auditLog/auditLoggerWorker");
const { linnworks } = require("../linnworks.js");

const updateInventoryItemPrices = async (price, pkStockItemID) => {
  let _result,
    _error = false;

  try {
    const invPrice = `inventoryItemPrices=${JSON.stringify([price])}`;
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/UpdateInventoryItemPrices",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: invPrice,
    });
    if (result) {
      _result = result;
      return { result, error: false };
    }
    if (error) {
      _error = error;
      return { error, result: false };
    }
  } catch (e) {
    linnworks.logger.error(e);
  } finally {
    await auditLogger.log(
      UPDATE_INVENTORY_ITEM_PRICES,
      -1,
      pkStockItemID,
      LINNWORKS,
      JSON.stringify({ _result, _error })
    );
  }
};

module.exports = updateInventoryItemPrices;
