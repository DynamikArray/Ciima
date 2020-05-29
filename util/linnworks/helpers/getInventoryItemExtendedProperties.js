const { linnworks } = require("../linnworks.js");
/**
 * getInventoryItemExtendedProperties get a list of Extended Properties for a specific
 * stock item using its pkStockItemID.
 * @param  Number  pkStockItemID - the linnworks pkStockItemID of the item
 * @param  {Object}  [params={}]   {PropertyName: Value} to search for
 * @return {Promise}               [description]
 */
const getInventoryItemExtendedProperties = async (
  pkStockItemID,
  params = {}
) => {
  try {
    const inventoryItem = `inventoryItemId=${pkStockItemID}&propertyParams=${JSON.stringify(
      params
    )}`;
    //CreateInventoryItemExtendedProperties
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/GetInventoryItemExtendedProperties",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: inventoryItem,
    });
    if (result) return { getPropsResult: result };
    if (error) return { getPropsError: error };
  } catch (e) {
    linnworks.logger.error(e);
  } finally {
    //
  }
};
module.exports = getInventoryItemExtendedProperties;
