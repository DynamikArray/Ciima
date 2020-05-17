const uuidv1 = require("uuid/v1");

const CategoryInfo = require("./data/categoryInfo.js");
const extendedProperties = require("./data/extendedProperties.js");

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

    //Handle pricing for Auctions vs Buy it Nows
    let draftPrice = draft.price;
    if (draft.draftType.toUpperCase() == "LOTS") {
      //Price gets set in InventoryPrices section
      draftPrice = 0.0;
    }

    const inventoryItem = {
      MetaData: "Added through Ciima: " + today,
      StockItemId: draft.stockItemId,
      ItemNumber: draft.itemNumber, //AKA sku?    Date.now().toString(), //aka SKU
      ItemTitle: encodeURIComponent(draft.inventoryTitle),
      Quantity: draft.quantity,
      BarcodeNumber: draft.upc,
      RetailPrice: draftPrice,
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
    const pkRowId = uuidv1();

    const props = [
      {
        IsAdded: true,
        StockItemId: StockItemId,
        Source: "EBAY",
        SubSource: "EBAY1_US",
        Price: draft.price,
        Tag: "Start",
        pkRowId: pkRowId
      }
    ];

    return `inventoryItemPrices=${JSON.stringify(props)}`;
  }
});
