module.exports = {
  description:
    "getItemsList - gets a list of items matching the repricing query conditions",
  tags: ["Repricing Service"],
  summary:
    "Query items needing repricing or that have been repriced across a given time range",

  security: [
    {
      token: [],
    },
  ],

  body: {
    type: "object",
    properties: {
      repricedItems: {
        type: "boolean",
        default: false,
      },
    },
  },

  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: {
        result: {
          type: "array",
          items: {
            type: "object",
            properties: {
              pkStockItemID: {
                type: "string",
              },
              ItemNumber: {
                type: "string",
              },
              CategoryName: {
                type: "string",
              },
              LocationCode: {
                type: "string",
              },
              Image: {
                type: "string",
              },
              ItemTitle: {
                type: "string",
              },
              Quantity: {
                type: "number",
              },
              InOrderBook: {
                type: "number",
              },
              OnOrder: {
                type: "number",
              },
              RetailPrice: {
                type: "number",
              },
              StockItemPrice: {
                type: "number",
              },
              eBayListingPrice: {
                type: "number",
              },
              LastPrice: {
                type: "string",
              },
              LastPriced: {
                type: "string",
              },
              ItemCreationDate: {
                type: "string",
              },
              eBayStartTime: {
                type: "string",
              },
              eBayEndTime: {
                type: "string",
              },
              eBayListingStatus: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};
