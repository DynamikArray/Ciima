//const queryString = require("query-string");
//const StockItemsBuilder = require("../../../../../util/linnworks/StockItemsBuilder");

const ebay = require("ebay-api");
const { format, subDays } = require("date-fns");

module.exports = fastify => ({
  searchInventoryHandler: async (req, res) => {
    return new Promise(function(resolve, reject) {
      try {
        let today = new Date();
        const StartTimeTo = today.toISOString();
        const StartTimeFrom = subDays(today, 45).toISOString();

        const params = {
          GranularityLevel: "Coarse",
          StartTimeTo,
          StartTimeFrom,
          Pagination: {
            entriesPerPage: 10,
            pageNumber: 1
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
            //console.log(itemsResponse);
            if (error) reject(error);

            resolve({ result: itemsResponse });
          }
        );
      } catch (error) {
        console.log(error);
        fastify.winston.error(error);
      }
    });
  }
});
