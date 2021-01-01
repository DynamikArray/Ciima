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
                    type: "boolean",
                  },
                  errorMessage: {
                    type: "string",
                  },
                },
              },
            },

            repricingLog: {
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
                    type: "string",
                  },
                  newPrice: {
                    type: "string",
                  },
                  dateUpdated: {
                    type: "string",
                  },
                },
              },
            },
            ordersHistory: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  cFullName: {
                    type: "string",
                  },
                  cEmailAddress: {
                    type: "string",
                  },
                  cShippingAddress: {
                    type: "string",
                  },
                  cPostCode: {
                    type: "string",
                  },
                  dReceievedDate: {
                    type: "string",
                  },
                  dProcessedOn: {
                    type: "string",
                  },
                  nOrderId: {
                    type: "string",
                  },
                  Source: {
                    type: "string",
                  },
                  ReferenceNum: {
                    type: "string",
                  },
                  ExternalReference: {
                    type: "string",
                  },
                  PostalTrackingNumber: {
                    type: "string",
                  },
                  Address1: {
                    type: "string",
                  },
                  Address2: {
                    type: "string",
                  },
                  Town: {
                    type: "string",
                  },
                  Region: {
                    type: "string",
                  },
                  BuyerPhoneNumber: {
                    type: "string",
                  },
                  SubTotal: {
                    type: "string",
                  },
                  PostageCostExTax: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        /*
        total: {
          type: "number",
        },
        */
      },
    },
  },
};
