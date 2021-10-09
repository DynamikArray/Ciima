const { linnworks } = require("../linnworks.js");

const addEbayCategoryFields = async (StockItemId, ItemNumber, ebayCategeoryFields) => {
  try {
    const props = Object.entries(ebayCategeoryFields).map((field) => {
      return {
        fkStockItemId: StockItemId,
        SKU: ItemNumber,
        ProperyName: field[0],
        PropertyValue: field[1],
        PropertyType: "Attribute",
      };
    });

    //CreateInventoryItemExtendedProperties
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/CreateInventoryItemExtendedProperties",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: `inventoryItemExtendedProperties=${JSON.stringify(props)}`,
    });

    if (result) return { ebayCatFieldsResult: result };
    if (error) return { ebayCatFieldsError: error };
  } catch (e) {
    return { ebayCatFieldsError: e.message };
  }
};

module.exports = addEbayCategoryFields;
