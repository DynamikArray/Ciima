module.exports = {
  description: "Reporting ",
  tags: ["Reporting"],
  summary:
    "Query Linnworks for Sold Items by Start/End date and Category Name.",

  security: [
    {
      token: [],
    },
  ],

  querystring: {
    startDate: {
      type: "string",
    },
    endDate: {
      type: "string",
    },
    categoryName: {
      type: "string",
    },
  },

  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: {
        results: {
          type: "array",
          items: {
            type: "object",
            properties: {
              processedOnDate: { type: "string" },
              categoryName: { type: "string" },
              linnworksSKU: { type: "string" },
              linnworksTitle: { type: "string" },
              mainCharacters: { type: "string" },
              publishers: { type: "string" },
              pricePerUnit: { type: "string" },
            },
          },
        },
        total: { type: "string" },
      },
    },
  },
};
