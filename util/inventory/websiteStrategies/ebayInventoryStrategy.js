const { LOAD_EBAY } = require("../actions");
const ebay = require("ebay-api");

//include logger
const logger = require("../../winston/winston.js")({
  hostname: "Utility"
});

const { InventoryItemBuilder } = require("../InventoryItem");
const { saveInventoryPageToDb } = require("../saveInventoryPageToDb");

function ebayInventoryStrategy(action) {
  this.action = action;
  this.resultsCount = 0;

  /**
   * [fetchInventoryPage description]
   * @param  {[type]} startDate  [description]
   * @param  {[type]} endDate    [description]
   * @param  {[type]} pageNumber [description]
   * @return {[type]}            [description]
   */
  const fetchInventoryPage = (dates, pageNumber) => {
    logger.debug(
      `Fetching Inventory for ${JSON.stringify(dates)} on page ${pageNumber}`
    );

    return new Promise((resolve, reject) => {
      try {
        const params = {
          ...dates,
          GranularityLevel: "Coarse",
          Pagination: {
            entriesPerPage: 200,
            pageNumber: pageNumber
          }
        };

        ebay.xmlRequest(
          {
            serviceName: "Trading",
            opType: "GetSellerList",
            appId: process.env.EBAY_APP_ID,
            devId: process.env.EBAY_DEV_ID,
            certId: process.env.EBAY_CERT_ID,
            authToken: process.env.EBAY_AUTH_TOKEN,
            params,
            parser: ebay.parseResponseJson // (default)
          },
          (error, itemsResponse) => {
            if (error) reject(error);
            resolve({ ...itemsResponse });
          }
        );
      } catch (e) {
        console.log(e);
        logger.error(e);
        reject;
      }
    });
  };

  /**
   * [saveInventoryPage description]
   * @param  {[type]}  results [description]
   * @return {Promise}         [description]
   */
  const saveInventoryPage = async (results, hasEnded) => {
    const valuesOnly = results
      .filter(item => {
        if (item.Site !== "US") return false;
        return true;
      })
      .map(item => {
        const newItem = new InventoryItemBuilder(item.ItemID, item.Title)
          .setImageFull(item.PictureDetails.GalleryURL)
          .setSKU(item.SKU)
          .setPrice(item.SellingStatus.CurrentPrice.amount)
          .setQuantity(item.Quantity)
          .setStartDateTime(item.ListingDetails.StartTime)
          .setEndDateTime(item.ListingDetails.EndTime)
          .setLocation(item.SKU)
          //.setBinRack(item.SKU)
          .setSourceProvider("EBAY")
          .setHasEnded(hasEnded)
          .build();
        //send back only the values so we can UPSERT THEM
        return Object.values(newItem);
      });

    const savedResults = await saveInventoryPageToDb(valuesOnly);
    return savedResults;
  };

  /**
   * load - the common main load inventory method for websites
   * @param  {Boolean} [payload=false] [description]
   * @return {Promise}                 [description]
   */
  const load = async payload => {
    let pageNumber = 1;
    let totalPages = 1;
    let totalEntries = 0;

    while (pageNumber <= totalPages) {
      //get our date range from payload
      const { dates, hasEnded } = payload;
      //fetch page from inventory
      const fetchedPage = await fetchInventoryPage(dates, pageNumber);
      //from those results get properties
      const { PageNumber, PaginationResult, Items } = fetchedPage;
      //set our local totalPages, totalEntris
      totalPages = PaginationResult.TotalNumberOfPages || totalPages++;
      totalEntries = PaginationResult.TotalNumberOfEntries;

      //we should results so
      if (totalEntries > 0) {
        //save em if we do
        if (Items.length > 0) {
          const savedResults = await saveInventoryPage(Items, hasEnded);
          logger.debug(
            `inventory load() : ${JSON.stringify(
              savedResults
            )} on page ${pageNumber}`
          );
          //update our local count
          this.resultsCount = totalEntries;
          //save these results
        }
      }
      pageNumber++;
    }
    //return some local counts, since rows are saved
    return { resultCount: this.resultsCount, totalPages, totalEntries };
  };

  //return/expose the "load" method only
  return { load };
}
//export the stuff
module.exports = ebayInventoryStrategy;
