const ebay = require("../../ebayAPI");
//include logger
const logger = require("../../winston/winston.js")({ hostname: "Server" });

/**
 * [titleChecker description]
 * @param  {[type]}  searchString [description]
 * @return {Promise}              [description]
 */
const titleChecker = async searchString => {
  //this will handle both linnworks and ebay in the future
  //for now just ebay
  //
  //
  //
  return await checkTitleOnEbay(searchString);
  //return { result: { passed: false, failed: true } };
  //return { result: { passed: true, failed: false } };
};

const checkTitleOnEbay = async searchString => {
  try {
    logger.debug(`Checking Title on ebay for ${searchString}`);

    const params = {
      keywords: [`"${searchString}"`],
      //categoryId: 63, //comics
      //outputSelector: ["SellerInfo", "AspectHistogram", "PictureURLLarge"],
      paginationInput: {
        entriesPerPage: 10
      }
      //sortOrder: "CurrentPriceHighest"
    };

    const { result } = await callEbay(params);

    if (result.searchResult && result.paginationOutput) {
      if (result.paginationOutput.totalEntries == 0) {
        return { result: { passed: true, failed: false, items: false } };
      }

      if (result.paginationOutput.totalEntries > 0) {
        return {
          result: { passed: false, failed: true, items: result.searchResult }
        };
      }
    }
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

/**
 * [callEbay description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
const callEbay = params => {
  const { searchType } = this; //local instance of search type
  return new Promise(function(resolve, reject) {
    ebay.xmlRequest(
      {
        serviceName: "Finding",
        opType: "findItemsByKeywords",
        appId: process.env.EBAY_APP_ID,
        params: params,
        parser: ebay.parseResponseJson // (default)
      },
      (error, itemsResponse) => {
        if (error) reject(error);
        resolve({ result: itemsResponse });
      }
    );
  });
};

module.exports = { titleChecker };
