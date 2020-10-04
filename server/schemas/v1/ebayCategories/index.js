module.exports = {
  ebayCategories: {
    description: "Search For Ebay Categories",
    tags: ["Ebay"],
    summary: "Search the database for the Ebay category",

    security: [
      {
        token: [],
      },
    ],

    querystring: {
      q: { type: "string" },
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
                id: { type: "number" },
                ebayCategoryId: { type: "number" },
                ebayCategoryName: { type: "string" },
              },
            },
          },
        },
      },
    },
  },

  ebaySiteCategories: {
    description: "Search ALL Ebay Site Categories",
    tags: ["Ebay"],
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
