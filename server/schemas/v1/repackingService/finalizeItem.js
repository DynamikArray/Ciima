//const { } = require("../../../config/appConstants").repackingService;

module.exports = {
  description:
    "finalizeItem - Finalize Item for repacking.  This is the last step to mark the item as moved onto repacking. ",
  tags: ["Repacking Service"],
  summary: "Finalize Repacking of inventory item and mark as [COMPLETED].",
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
