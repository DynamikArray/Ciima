const ebay = require("../../ebayAPI");
//const axios = require("axios");
const QuoteBuilder = require("../QuoteBuilder.js");

//include logger
const logger = require("../../winston/winston.js")({
  hostname: "Server"
});

/**
 * [ebayWebsiteStrategy description]
 * @param  {[type]} searchType [description]
 * @return {[type]}            [description]
 */
function ebayWebsiteStrategy(searchType) {
  /**
   * searchType opType parameter as defined by EBAY
   * @type {string}
   */
  this.searchType = searchType;

  /**
   * [formatRawPriceQuote description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  const formatRawPriceQuote = (data, searchType) => {
    const {
      title,
      galleryURL,
      pictureURLLarge,
      viewItemURL,
      sellerInfo,
      shippingInfo,
      sellingStatus,
      listingInfo
    } = data;

    const price = sellingStatus.convertedCurrentPrice.amount;
    const { sellerUserName, feedbackScore, topRatedSeller } = sellerInfo;
    const { endTime } = listingInfo;
    const { shippingServiceCost, shippingType } = shippingInfo;

    //handle if sold record
    const sellingState = sellingStatus.sellingState;
    let blnSold = false;
    let bidCount = 0;

    if (sellingState == "EndedWithSales") {
      bidCount = sellingStatus.bidCount;
      blnSold = true;
    }

    //make a price quote
    let priceQuote = new QuoteBuilder(title, price)
      .setSite("ebay")
      .setLink(viewItemURL)
      .setImage(pictureURLLarge)
      .setThumbnail(galleryURL)
      .setMetaSellersInfo(sellerUserName, feedbackScore, topRatedSeller)
      .setMetaListingDate(searchType, endTime)
      .setMetaSellingStatus(blnSold, bidCount);

    //check if we shoudl add shipping
    if (shippingServiceCost)
      priceQuote.setMetaShippingInfo(shippingType, shippingServiceCost.amount);

    //build it
    priceQuote.build();

    return priceQuote.quote;
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
          opType: searchType,
          appId: process.env.EBAY_APP_ID,
          params: params,
          parser: ebay.parseResponseJson // (default)
        },
        (error, itemsResponse) => {
          if (error) reject(error);
          resolve({ result: itemsResponse.searchResult });
        }
      );
    });
  };

  /**
   * search  Main search method that exists on all websiteStrategies
   * @param  {[type]}  searchString [description]
   * @return {Promise}              returns with an results object containing an array of Quote objects
   *                                eg.  {results : [Quote]}   or an {error: object}
   */
  const search = async searchString => {
    try {
      logger.debug(`Searching ebay ${this.searchType} for ${searchString}`);

      const params = {
        keywords: searchString,
        categoryId: 63, //comics
        outputSelector: ["SellerInfo", "AspectHistogram", "PictureURLLarge"],
        paginationInput: {
          entriesPerPage: 50
        },
        sortOrder: "CurrentPriceHighest"
      };

      const { result } = await callEbay(params);

      if (result.item && result.item.length > 0) {
        const prices = result.item.map(data => {
          return formatRawPriceQuote(data, this.searchType);
        });
        return { result: prices };
      } else {
        return { result: [] };
      }
    } catch (error) {
      logger.error(error);
      return { error };
    }
  };
  //return our search method to be used
  return { search };
}

module.exports = ebayWebsiteStrategy;
