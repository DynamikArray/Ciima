module.exports = {
  description:
    "Reprice Item By Id - adjust Item Price using internal pricing rules.",
  tags: ["Repricing Service"],
  summary:
    "Adjust the items price using the internal rules of decreasing the price a fixed amount.",

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
      ItemTitle: {
        type: "string",
      },
    },
    required: ["pkStockItemID", "ItemTitle"],
  },
};
