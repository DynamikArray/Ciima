const { perComicPriceThreshold, includeItemsInOrderBook } = require("../../../config/appConstants").repackingService;

module.exports = {
  description: "searchItems - gets a list of items matching the Repacking Service query conditions",
  tags: ["Repacking Service"],
  summary:
    "Query inventory items for information as it relates to pricing. Per Comic Price is this services current use case.",

  security: [
    {
      token: [],
    },
  ],

  body: {
    type: "object",
    properties: {},
  },

  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: {
        total: {
          type: "number",
        },
        result: {
          type: "array",
          items: {
            type: "object",
            properties: {
              pkStockItemID: {
                type: "string",
              },
              CreationDate: {
                type: "string",
              },
              Image: {
                type: "string",
              },
              ItemTitle: {
                type: "string",
              },
              ItemNumber: {
                type: "string",
              },

              LocationCode: {
                type: "string",
              },

              Quantity: {
                type: "number",
              },

              InOrderBook: {
                type: "number",
              },

              TotalIssues: {
                type: "number",
              },

              CurrentListingPrice: {
                type: "number",
              },

              PerComicPrice: {
                type: "number",
              },

              BelowThreshold: {
                type: "number",
              },

              ebayStartTime: {
                type: "string",
              },

              ebayEndTime: {
                type: "string",
              },

              ebayQty: {
                type: "number",
              },

              ebayActive: {
                type: "number",
              },

              ebayRelistPending: {
                type: "number",
              },

              ebayLastUpdateDate: {
                type: "string",
              },

              ebayListingPrice: {
                type: "number",
              },

              ebayItemNumber: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};
