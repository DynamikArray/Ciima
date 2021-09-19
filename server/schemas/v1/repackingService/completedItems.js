module.exports = {
  description: "completedItems - gets a list of items marked as Completed Repacking",
  tags: ["Repacking Service"],
  summary: "View items marked as Completed Repacking.",
  security: [
    {
      token: [],
    },
  ],

  body: {
    type: "object",
    properties: {},
  },

  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: {
        total: {
          type: "number",
        },
        result: {
          type: "array",
          items: {
            type: "object",
            properties: {
              pkStockItemID: {
                type: "string",
              },
              CreationDate: {
                type: "string",
              },
              Image: {
                type: "string",
              },
              ItemTitle: {
                type: "string",
              },
              ItemNumber: {
                type: "string",
              },

              LocationCode: {
                type: "string",
              },

              Quantity: {
                type: "number",
              },

              InOrderBook: {
                type: "number",
              },

              TotalIssues: {
                type: "number",
              },

              CurrentListingPrice: {
                type: "number",
              },

              PerComicPrice: {
                type: "number",
              },

              BelowThreshold: {
                type: "number",
              },

              ebayStartTime: {
                type: "string",
              },

              ebayEndTime: {
                type: "string",
              },

              ebayQty: {
                type: "number",
              },

              ebayActive: {
                type: "number",
              },

              ebayRelistPending: {
                type: "number",
              },

              ebayLastUpdateDate: {
                type: "string",
              },

              ebayListingPrice: {
                type: "number",
              },

              ebayItemNumber: {
                type: "string",
              },

              repackCompleted: {
                type: "number",
              },

              repackCompletedDate: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },
};
