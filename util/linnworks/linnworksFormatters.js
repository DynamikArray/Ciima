const uuidv1 = require("uuid/v1");

// TODO: move to a call with the initiliaze statement to look up by CategoryName
// and apply to linnworks object for use
const categoryInfo = {
  CategoryId: "7904e4ec-0487-4d62-ba8b-b0934e106dbd",
  CategoryName: "EBAY-SETS"
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
    const stockItemId = uuidv1();

    const inventoryItem = {
      StockItemId: stockItemId,
      ItemNumber: Date.now(), //aka SKU
      ItemTitle: encodeURIComponent(draft.inventoryTitle),
      Quantity: draft.quantity,
      // BarcodeNumber: "234324234",
      // MetaData: "sample string 8",
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

    //format this object to the needed data style for linnwokrs
    const formattedData = `inventoryItem=` + JSON.stringify(inventoryItem);
    return formattedData;
  },
  //
  //
  addImageToInventoryItem: draft => {},
  //
  //
  //
  //
  //
  itemExtendedProperties: (fkStockItemId, sku, draft) => {
    const extendedProperties = [];
    //

    /*
    {
        "fkStockItemId": "ff72395d-a0ba-442f-a38a-e44323851974",
        "SKU": "sample string 1",
        "ProperyName": "sample string 2",
        "PropertyValue": "sample string 3",
        "PropertyType": "sample string 4"
      },
      {
        "fkStockItemId": "ff72395d-a0ba-442f-a38a-e44323851974",
        "SKU": "sample string 1",
        "ProperyName": "sample string 2",
        "PropertyValue": "sample string 3",
        "PropertyType": "sample string 4"
      }
     */
    const item = {};
    return item;
  }
});
