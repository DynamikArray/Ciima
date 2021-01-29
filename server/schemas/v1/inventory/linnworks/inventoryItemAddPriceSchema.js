module.exports = {
  description: "inventoryItemAddPrice - V2 Add new Decline price mostly for GTC items.",
  tags: ["Inventory"],
  summary: "inventoryItemAddPrice: add a new Decline price to an item.",
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
