module.exports = {
  description: "inventoryItemUpdatePriceSchema - V2 Update Inventory Price Fields: Retail, Listing, Start, Decline.",
  tags: ["Inventory"],
  summary: "Update Inventory Item Prices: Retail, Listing, Start, Decline.",
  security: [
    {
      token: [],
    },
  ],
  body: {
    type: "object",
    properties: {
      inventoryItemId: {
        type: "string",
      },
      fieldName: {
        type: "string",
      },
      fieldValue: {
        type: "string",
      },
      locationId: {
        type: "string",
      },
      changeSource: {
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
