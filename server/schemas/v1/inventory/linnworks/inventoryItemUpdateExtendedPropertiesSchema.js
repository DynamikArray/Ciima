module.exports = {
  description:
    "inventoryItemUpdateFieldSchema - V2 Update Inventory Item Fields: Title, Retail Price, Stock Level, Bin Rack",
  tags: ["Inventory"],
  summary:
    "Update Inventory Item Fields: Title, Retail Price, Stock Level, Bin Rack and have the corresponding Ebay Template updated, where approiate.",
  security: [
    {
      token: [],
    },
  ],
  body: {
    type: "object",
    properties: {
      pkRowId: {
        type: "string",
      },
      fkStockItemId: {
        type: "string",
      },
      ProperyName: {
        type: "string",
      },
      ProperyValue: {
        type: "string",
      },
      ProperyType: {
        type: "string",
      },
    },
  },

  /*
  response: {
    200: {

    }
  }
  */
};
