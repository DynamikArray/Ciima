module.exports = {
  description: "Query Category Sales Data",
  tags: ["Reporting"],
  summary: "Query Linnworks for Cateogry Sales Data by Start/End date and Category Name.",

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

  /*
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
  */
};
