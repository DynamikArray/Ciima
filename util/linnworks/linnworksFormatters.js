// TODO: move to a call with the initiliaze statement to look up by CategoryName
// and apply to linnworks object for use
const categoryInfo = {
  CategoryId: "7904e4ec-0487-4d62-ba8b-b0934e106dbd",
  CategoryName: "EBAY-SETS"
};

//grab our list of one to one fields to extended properties
const extendedProperties = require("./extendedProperties.js");

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

    const inventoryItem = {
      MetaData: "Added through Ciima: " + Date.now(),
      StockItemId: draft.stockItemId,
      ItemNumber: draft.itemNumber, //AKA sku?    Date.now().toString(), //aka SKU
      ItemTitle: encodeURIComponent(draft.inventoryTitle),
      Quantity: draft.quantity,
      // BarcodeNumber: "234324234",

      // PurchasePrice: 9.1,   number of issues x or include it here
      RetailPrice: draft.price,
      //PostalServiceId: "7adfafe9-ff34-4f43-aca9-5782d1c4394e",
      //PostalServiceName: "sample string 12",

      //get linnworks store category for ebay category id
      CategoryId: categoryInfo.CategoryId, //"f0fe6db1-70e9-40e9-8744-2dbda458f574",
      CategoryName: categoryInfo.CategoryName //"EBAY-SETS"
      /*package data */
      //PackageGroupId: "bad339a7-d9c3-4542-a96c-afe154abac81",
      //PackageGroupName: "sample string 16",
      //Height: 17.1,
      //Width: 18.1,
      //Depth: 19.1,
      //Weight: 20.1,
      //InventoryTrackingType: 21,
      //BatchNumberScanRequired: true,
      //SerialNumberScanRequired: true,
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
  }
});
