module.exports = {
  description: "inventoryItem - V2 - Improved Inventory Item Details",
  tags: ["Inventory"],
  summary:
    "inventoryItem - V2 - Improved Inventory Item Details with a more robust data set for editing values",
  security: [
    {
      token: [],
    },
  ],
  body: {
    type: "object",
    properties: {
      pkStockItemID: {
        type: "string",
      },
    },
  },

  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: {
        result: {
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
            CategoryName: {
              type: "string",
            },
            ItemNumber: {
              type: "string",
            },
            BinRackNumber: {
              type: "string",
            },
            Quantity: {
              type: "string",
            },
            RetailPrice: {
              type: "string",
            },
            ListingPrice: {
              type: "string",
            },
            ExtraDescription: {
              type: "string",
            },
            IssueNumbers: {
              type: "string",
            },
          },
        },
        total: {
          type: "number",
        },
      },
    },
  },
};
