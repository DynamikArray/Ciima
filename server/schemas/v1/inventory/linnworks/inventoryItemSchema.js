module.exports = {
  description: "inventoryItem - V2 - Improved Inventory Item Details",
  tags: ["Inventory"],
  summary:
    "inventoryItem - V2 - Improved Inventory Item Details with a more robust data set for editing values",
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
            CategoryName: {
              type: "string",
            },
            ItemNumber: {
              type: "string",
            },
            BinRackNumber: {
              type: "string",
            },
            Quantity: {
              type: "string",
            },
            RetailPrice: {
              type: "string",
            },
            ListingPrice: {
              type: "string",
            },
            ExtraDescription: {
              type: "string",
            },
            IssueNumbers: {
              type: "string",
            },
            prices: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  pkRowId: {
                    type: "string",
                  },
                  Source: {
                    type: "string",
                  },
                  SubSource: {
                    type: "string",
                  },
                  Price: {
                    type: "number",
                  },
                  Tag: {
                    type: "string",
                  },
                  StockItemId: {
                    type: "string",
                  },
                  UpdateStatus: {
                    type: "string",
                  },
                  StockItemIntId: {
                    type: "string",
                  },
                },
              },
            },
            ebayHistory: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  pkListId: {
                    type: "string",
                  },
                  ItemNumber: {
                    type: "string",
                  },
                  ItemTitle: {
                    type: "string",
                  },
                  startTime: {
                    type: "string",
                  },
                  endTime: {
                    type: "string",
                  },
                  Qty: {
                    type: "string",
                  },
                  Active: {
                    type: "string",
                  },
                  RelistPending: {
                    type: "string",
                  },
                  MappedBy: {
                    type: "string",
                  },
                  RelistedFromItemNumber: {
                    type: "string",
                  },
                  ListingPrice: {
                    type: "string",
                  },
                  SiteId: {
                    type: "string",
                  },
                  fkTemplateId: {
                    type: "string",
                  },
                  fkStockItemId: {
                    type: "string",
                  },
                  ListingStatus: {
                    type: "string",
                  },
                  hasErrorMsg: {
                    type: "string",
                  },
                  errorMessages: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        total: {
          type: "number",
        },
      },
    },
  },
};
