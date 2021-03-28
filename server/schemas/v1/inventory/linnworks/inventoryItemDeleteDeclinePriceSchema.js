module.exports = {
  description: "inventoryItemDeleteDeclinePrice - V2 Deletes new Decline price mostly for GTC items.",
  tags: ["Inventory"],
  summary: "inventoryItemDeleteDeclinePrice: delete a Decline price to an item.",
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
      inventoryItemPriceId: {
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
