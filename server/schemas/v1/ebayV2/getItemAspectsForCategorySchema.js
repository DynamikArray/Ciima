module.exports = {
  getItemAspectsForCategorySchema: {
    description: "Gets Item Aspects (fields) for selected Category",
    tags: ["EbayV2"],
    summary: "Gets all item aspects for a selected category",
    security: [
      {
        token: [],
      },
    ],
    querystring: {
      type: "object",
      properties: {
        ebaySiteCategoryId: { type: "number" },
        ebaySiteCategoryTreeId: { type: "number" },
      },
    },
  },
};
