const { UPDATE_INVENTORY_ITEM_TITLES } = require("../../auditLog/logActionTypes");
const { LINNWORKS } = require("../../auditLog/logResourceTypes");

const auditLogger = require("../../auditLog/auditLoggerWorker");
const { linnworks } = require("../linnworks.js");

const updateInventoryItemTitles = async (title, pkStockItemID) => {
  let _result,
    _error = false;

  try {
    const invTitle = `inventoryItemTitles=${JSON.stringify([title])}`;
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/UpdateInventoryItemTitles",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: invTitle,
    });
    if (result) {
      _result = result;
      return { updateTitlesResult: result, updateTitlesError: false };
    }
    if (error) {
      _error = error;
      return { updateTitlesError: error, updateTitlesResult: false };
    }
  } catch (e) {
    linnworks.logger.error(e);
  } finally {
    await auditLogger.log(UPDATE_INVENTORY_ITEM_TITLES, -1, pkStockItemID, LINNWORKS, JSON.stringify({ _result, _error }));
  }
};

module.exports = updateInventoryItemTitles;
