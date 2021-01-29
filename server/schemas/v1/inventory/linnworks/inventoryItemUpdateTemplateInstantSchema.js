module.exports = {
  description:
    "inventoryItemUpdateTemplateInstant - V2 Update Inventory Item Template.  Push any content changes to this items template.",
  tags: ["Inventory"],
  summary: "Pushes any content changes the item has to the Channel listing templates and out to the sales channel (Ebay)",
  security: [
    {
      token: [],
    },
  ],
  body: {
    type: "object",
    properties: {
      pkStockItemId: {
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
