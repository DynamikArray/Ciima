module.exports = {
  getEbaySiteCategoriesSchema: {
    description: "Search ALL Ebay Site Categories",
    tags: ["EbayV2"],
    summary: "Search ALL Ebay Site Categories",

    security: [
      {
        token: [],
      },
    ],

    querystring: {
      CategoryParent: { type: "number" },
      LevelLimit: { type: "number", default: 1 },
    },

    response: {
      //200: {},
    },
  },
};
