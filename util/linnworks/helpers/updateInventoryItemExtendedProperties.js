const { CREATE_ITEM_EXTENDED_PROPERTIES, UPDATE_ITEM_EXTENDED_PROPERTIES } = require("../../auditLog/logActionTypes");
const { LINNWORKS } = require("../../auditLog/logResourceTypes");
const auditLogger = require("../../auditLog/auditLoggerWorker");

const { linnworks } = require("../linnworks.js");
/**
 * updateInventoryItemExtendedProperties updates a list of Extended Properties for a specific
 * stock item using its pkStockItemID.
 * @param  Array  props   Array of Prop objects formatted for linnworks
 * @param  Number  pkStockItemID - the linnworks pkStockItemID of the item
 * @return {Promise}               [description]
 */
const updateInventoryItemExtendedProperties = async (props, pkStockItemID, userId = false) => {
  let _result,
    _error = false;

  try {
    const extProps = `inventoryItemExtendedProperties=${JSON.stringify(props)}`;
    //CreateInventoryItemExtendedProperties
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/updateInventoryItemExtendedProperties",
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
      UPDATE_ITEM_EXTENDED_PROPERTIES,
      userId || -1,
      pkStockItemID,
      LINNWORKS,
      JSON.stringify({
        _result,
        _error,
      })
    );
  }
};
module.exports = updateInventoryItemExtendedProperties;
