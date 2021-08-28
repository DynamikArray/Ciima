const { perComicPriceThreshold, includeItemsInOrderBook } = require("../../../config/appConstants").pricingService;

module.exports = {
  description: "getItemsList - gets a list of items matching the pricing service query conditions",
  tags: ["Pricing Service"],
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
            },
          },
        },
      },
    },
  },
};
