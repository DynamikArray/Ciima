// TODO: move to a call with the initiliaze statement to look up by CategoryName
// and apply to linnworks object for use
/*const categoryInfo = {
  CategoryId: "7904e4ec-0487-4d62-ba8b-b0934e106dbd",
  CategoryName: "EBAY-SETS"
};
*/

const CategoryInfo = {
  test: {
    CategoryId: "85e5eecb-de9b-451f-9481-b660d79ca7d0",
    CategoryName: "CIIMA-TEST"
  },
  sets: {
    CategoryId: "7904e4ec-0487-4d62-ba8b-b0934e106dbd",
    CategoryName: "EBAY-SETS"
  },
  singles: {
    CategoryId: "3048b178-b1bb-421f-8a63-5daf40506665",
    CategoryName: "EBAY-SINGLES"
  },
  adult: {
    CategoryId: "e029f490-892a-464d-9642-d52fd3ead5a8",
    CategoryName: "EBAY-ADULT"
  },
  lots: {
    CategoryId: "f4d390ed-da08-4c9f-abcb-e0d0e9283be6",
    CategoryName: "EBAY-LOTS"
  }
};

//grab our list of one to one fields to extended properties
const extendedProperties = require("./extendedProperties.js");

const setLinnworksCategory = draftType => {
  let categoryInfo = {};
  if (draftType === "sets") categoryInfo = CategoryInfo.sets;
  if (draftType === "singles") categoryInfo = CategoryInfo.singles;
  if (draftType === "adult") categoryInfo = CategoryInfo.adult;
  if (draftType === "lots") categoryInfo = CategoryInfo.lots;

  if (process.env.NODE_ENV === "development") categoryInfo = CategoryInfo.test;
  return categoryInfo;
};

//build out a handler to format our data to linnworks needed values
module.exports = logger => ({
  //format for creating basic new inventory item
  /**
   * newInventoryItem - adds a new item into linnworks inventory    *
   * @param  {object} draft draft entry from ciima
   * @return {string}       properally formatted request body containing item details    *
   */
  newInventoryItem: draft => {
    logger.debug(`Format draft for inventory draft`, draft);
    const today = new Date();

    const categoryInfo = setLinnworksCategory(draft.draftType);

    const inventoryItem = {
      MetaData: "Added through Ciima: " + today,
      StockItemId: draft.stockItemId,
      ItemNumber: draft.itemNumber, //AKA sku?    Date.now().toString(), //aka SKU
      ItemTitle: encodeURIComponent(draft.inventoryTitle),
      Quantity: draft.quantity,
      BarcodeNumber: draft.upc,
      RetailPrice: draft.price,
      CategoryId: categoryInfo.CategoryId,
      CategoryName: categoryInfo.CategoryName
    };

    return inventoryItem;
  },

  /**
   * [formattedInventoryItem description]
   * @param  {[type]} inventoryItem [description]
   * @return {[type]}               [description]
   */
  formattedInventoryItem: inventoryItem => {
    //format this object to the needed data style for linnwokrs
    const formattedData = `inventoryItem=` + JSON.stringify(inventoryItem);
    return formattedData;
  },

  /**
   * [itemExtendedProperties description]
   * @param  {[type]} fkStockItemId [description]
   * @param  {[type]} SKU           [description]
   * @param  {[type]} draft         [description]
   * @return {[type]}               [description]
   */
  itemExtendedProperties: (fkStockItemId, SKU, draft) => {
    //we need to turn these into and array of objects to add
    const props = extendedProperties.map(prop => {
      return {
        fkStockItemId,
        SKU,
        ProperyName: prop.name,
        PropertyValue: draft[prop.field],
        PropertyType: "Attribute"
      };
    });

    return `inventoryItemExtendedProperties=${JSON.stringify(props)}`;
  },

  /**
   * [itemInventoryPrices description]
   * @return {[type]} [description]
   */
  itemInventoryPrices: (StockItemId, ItemNumber, draft) => {
    const props = [
      {
        IsAdded: true,
        StockItemId: StockItemId,
        Source: "EBAY",
        SubSource: "EBAY1_US",
        Price: draft.price,
        Tag: "Start"
      }
    ];

    return `inventoryItemPrices=${JSON.stringify(props)}`;
  }
});
