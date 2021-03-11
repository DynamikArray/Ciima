module.exports = {
  description: "inventoryItem Select To Clone - Used to Clone GTC item from inventory into GTCS draft",
  tags: ["Inventory"],
  summary: "inventoryItem Select To Clone - Used to Clone GTC item from inventory into GTCS draft",
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
          type: "array",
          items: {
            type: "object",
            properties: {
              pkStockItemID: {
                type: "string",
              },
              inventoryTitle: {
                type: "string",
              },
              CategoryName: {
                type: "string",
              },
              ItemNumber: {
                type: "string",
              },
              locationCode: {
                type: "string",
              },
              quantity: {
                type: "string",
              },
              price: {
                type: "string",
              },
              declinePrice: {
                type: "string",
              },
              extraDescription: {
                type: "string",
              },
              mainCharacter: {
                type: "string",
              },
              publisher: {
                type: "string",
              },
              ebaySiteCategoryId: {
                type: "string",
              },
              ebayStoreCategoryIdOne: {
                type: "string",
              },
              ebayStoreCategoryIdTwo: {
                type: "string",
              },
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
