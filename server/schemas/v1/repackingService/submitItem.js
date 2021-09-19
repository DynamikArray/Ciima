//const { } = require("../../../config/appConstants").repackingService;

module.exports = {
  description:
    "submitItem - Submit Item for repacking.  This will make the item out of stock, and attemp to end any channel listings.  ",
  tags: ["Repacking Service"],
  summary: "Submit inventory items marks them as [PENDING], and zero's out stock and delists from channels.",
  security: [
    {
      token: [],
    },
  ],

  body: {
    type: "object",
    required: ["pkStockItemId", "sku"],
    properties: {
      pkStockItemId: {
        type: "string",
      },
      sku: {
        type: "string",
      },
    },
  },

  /*
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: {
        total: {
          type: "number",
        },
      },
    },
  },
  */
};
