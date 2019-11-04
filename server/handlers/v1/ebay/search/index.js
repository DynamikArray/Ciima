const ebay = require("ebay-api");

module.exports = fastify => ({
  searchHandler: (req, res) => {
    return new Promise(function(resolve, reject) {
      const { keywords, searchType } = req.body;

      const params = {
        keywords,
        categoryId: 63,
        outputSelector: ["SellerInfo", "AspectHistogram", "PictureURLLarge"],
        paginationInput: {
          entriesPerPage: 100
        },
        sortOrder: "CurrentPriceHighest"
      };

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
  }
});
