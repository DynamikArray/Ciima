const {
  CREATE_ITEM_EXTENDED_PROPERTIES,
} = require("../../auditLog/logActionTypes");
const { LINNWORKS } = require("../../auditLog/logResourceTypes");
const auditLogger = require("../../auditLog/auditLoggerWorker");

const { linnworks } = require("../linnworks.js");
/**
 * getInventoryItemExtendedProperties get a list of Extended Properties for a specific
 * stock item using its pkStockItemID.
 * @param  Number  pkStockItemID - the linnworks pkStockItemID of the item
 * @param  {Object}  [params={}]   {PropertyName: Value} to search for
 * @return {Promise}               [description]
 */
const createInventoryItemExtendedProperties = async (props, pkStockItemID) => {
  let _result,
    _error = false;

  try {
    const extProps = `inventoryItemExtendedProperties=${JSON.stringify(props)}`;
    //CreateInventoryItemExtendedProperties
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/createInventoryItemExtendedProperties",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: extProps,
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
      CREATE_ITEM_EXTENDED_PROPERTIES,
      -1,
      pkStockItemID,
      LINNWORKS,
      JSON.stringify({
        _result,
        _error,
      })
    );
  }
};
module.exports = createInventoryItemExtendedProperties;
