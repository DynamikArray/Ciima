const { linnworks } = require("../linnworks.js");

const auditLogger = require("../../auditLog/auditLoggerWorker");
const { ADJUST_TEMPLATE_INSTANT } = require("../../auditLog/logActionTypes");
const { LINNWORKS } = require("../../auditLog/logResourceTypes");

const adjustTemplatesInstant = async (pkStockItemID) => {
  let _result,
    _error = false;

  try {
    const adjustOpts = `inventoryItemIds=${JSON.stringify([
      pkStockItemID,
    ])}&source=EBAY&subSource=EBAY1&adjustmentOptions=${JSON.stringify({
      Price: true,
    })}`;

    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/AdjustTemplatesInstant",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: adjustOpts,
    });
    if (error) throw error;
    if (result) _result = result;
  } catch (e) {
    _error = e;
    linnworks.logger.error(e);
  } finally {
    await auditLogger.log(
      ADJUST_TEMPLATE_INSTANT,
      -1,
      pkStockItemID,
      LINNWORKS,
      JSON.stringify({ _result, _error })
    );
    //send back our results finally
    return { adjustResult: _result, adjustError: _error };
  }
};

module.exports = adjustTemplatesInstant;
