const { linnworks } = require("../linnworks.js");

/**
 * [addExtendedProperties description]
 * @param  {[type]}  StockItemId [description]
 * @param  {[type]}  ItemNumber  [description]
 * @param  {[type]}  draft       [description]
 * @return {Promise}             [description]
 */
const addExtendedProperties = async (StockItemId, ItemNumber, draft) => {
  const { itemExtendedProperties } = linnworks.formatters;
  const extendedProperties = itemExtendedProperties(
    StockItemId,
    ItemNumber,
    draft
  );

  //CreateInventoryItemExtendedProperties
  const { result, error } = await linnworks.makeApiCall({
    method: "POST",
    url: "Inventory/CreateInventoryItemExtendedProperties",
    headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
    data: extendedProperties
  });

  if (result) return { extPropsResult: result };
  if (error) return { extPropsError: error };
  //for each one of these draft properties we have to add an extended property
};

module.exports = addExtendedProperties;
