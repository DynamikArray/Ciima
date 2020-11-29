module.exports = {
  description:
    "getRepricingLog - gets a list of repriced items from the log files",
  tags: ["Repricing Service"],
  summary: "Query items that have been repriced.",

  security: [
    {
      token: [],
    },
  ],

  body: {
    type: "object",
    properties: {
      page: {
        type: "number",
        default: 1,
      },
      limit: {
        type: "number",
        default: 10,
      },
    },
  },

  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: {
        result: {
          type: "object",
          properties: {
            page: {
              type: "number",
            },
            pageCount: {
              type: "number",
            },
            pageLimit: {
              type: "number",
            },
            rowsTotal: {
              type: "number",
            },
            rows: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: {
                    type: "number",
                  },
                  pkStockItemID: {
                    type: "string",
                  },
                  itemTitle: {
                    type: "string",
                  },
                  oldPrice: {
                    type: "number",
                  },
                  newPrice: {
                    type: "number",
                  },
                  dateUpdated: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
