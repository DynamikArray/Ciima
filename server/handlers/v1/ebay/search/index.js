const ebay = require("ebay-api");

module.exports = fastify => ({
  searchSoldHandler: (req, res) => {
    return new Promise(function(resolve, reject) {
      const { keywords } = req.body;

      const params = {
        keywords,
        outputSelector: ["SellerInfo", "AspectHistogram"],
        paginationInput: {
          entriesPerPage: 50
        },
        sortOrder: "CurrentPriceHighest"
      };

      ebay.xmlRequest(
        {
          serviceName: "Finding",
          //opType: "findItemsByKeywords",
          opType: "findCompletedItems",
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
