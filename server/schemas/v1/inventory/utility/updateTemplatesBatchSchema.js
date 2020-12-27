module.exports = {
  description:
    "updateTemplatesBatch - update a batch of 'ebay' templates in linnworks",
  tags: ["Utility"],
  summary:
    "Used to update a group of items Ebay Templates.  Usefull for description changes that require updating all inventory",
  security: [
    {
      token: [],
    },
  ],

  body: {
    type: "object",
    properties: {
      categoryName: {
        type: "string",
      },
      extPropValue: {
        type: "string",
      },
      listingStatus: {
        type: "string",
      },
      batchSize: {
        type: "string",
        default: "100",
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
            counts: {
              type: "object",
              properties: {
                proccessedCount: {
                  type: "object",
                  properties: {
                    count: {
                      type: "string",
                    },
                  },
                },

                proccessingCount: {
                  type: "object",
                  properties: {
                    count: {
                      type: "string",
                    },
                  },
                },

                remainingCount: {
                  type: "object",
                  properties: {
                    count: {
                      type: "string",
                    },
                  },
                },
              },
            },
            rows: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  pkStockItemID: {
                    type: "string",
                  },
                  ItemNumber: {
                    type: "string",
                  },
                  ItemTitle: {
                    type: "string",
                  },
                  CategoryName: {
                    type: "string",
                  },
                  LastTemplateUpdate: {
                    type: "string",
                  },
                  ListingStatus: {
                    type: "string",
                  },
                  IsErrorMsg: {
                    type: "string",
                  },
                  errorMessage: {
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
