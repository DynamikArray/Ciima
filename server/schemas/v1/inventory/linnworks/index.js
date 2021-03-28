const inventorySearchSchema = require("./inventorySearchSchema");
const inventoryItemSchema = require("./inventoryItemSchema");
const inventoryItemUpdateFieldSchema = require("./inventoryItemUpdateFieldSchema");
const inventoryItemUpdateExtendedPropertiesSchema = require("./inventoryItemUpdateExtendedPropertiesSchema");
const inventoryItemUpdateTemplateInstantSchema = require("./inventoryItemUpdateTemplateInstantSchema");
const inventoryItemUpdatePriceSchema = require("./inventoryItemUpdatePriceSchema");
const inventoryItemAddPriceSchema = require("./inventoryItemAddPriceSchema");
const inventoryItemSelectToCloneSchema = require("./inventoryItemSelectToCloneSchema");
const inventoryItemDeleteDeclinePriceSchema = require("./inventoryItemDeleteDeclinePriceSchema");

module.exports = {
  //NEWER V2 Inventory Search and ItemTitle
  inventorySearchSchema: inventorySearchSchema,
  inventoryItemSchema: inventoryItemSchema,
  inventoryItemUpdateFieldSchema: inventoryItemUpdateFieldSchema,
  inventoryItemUpdateExtendedPropertiesSchema: inventoryItemUpdateExtendedPropertiesSchema,
  inventoryItemUpdateTemplateInstantSchema: inventoryItemUpdateTemplateInstantSchema,
  inventoryItemUpdatePriceSchema: inventoryItemUpdatePriceSchema,
  inventoryItemAddPriceSchema: inventoryItemAddPriceSchema,
  inventoryItemSelectToCloneSchema: inventoryItemSelectToCloneSchema,
  inventoryItemDeleteDeclinePriceSchema: inventoryItemDeleteDeclinePriceSchema,
  //END V2 Inventory Search And Stuff

  //
  //  OLD STILL IN USE for inputting related item changes
  //
  searchInventorySchema: {
    description: "Search Linnworks Inventory by the 3 main attributes",
    tags: ["Inventory"],
    summary: "Search through linnworks inventory using A, B, C",
    security: [
      {
        token: [],
      },
    ],
    body: {
      type: "object",
      properties: {
        searchString: {
          type: "string",
        },
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
              type: "object"
            }
          }
        }
      }
    }*/
  },

  updateLocationOrQuantitySchema: {
    description: "Updates an Inventory items location or quantity values",
    tags: ["Inventory"],
    summary: "Update location and or quantity of Inventory items values in Linnworks",
    security: [
      {
        token: [],
      },
    ],
    body: {
      type: "object",
      properties: {
        inventoryItemId: {
          type: "string",
        },
        locationId: {
          type: "string",
        },
        fieldName: {
          type: "number",
        },
        fieldValue: {
          type: "string",
        },
        changeSource: {
          type: "string",
        },
      },
    },
  },

  updateInventoryItemFieldSchema: {
    description: "Updates an Inventory items location or quantity values",
    tags: ["Inventory"],
    summary: "Update non Location Fields of Inventory items values in Linnworks ",
    security: [
      {
        token: [],
      },
    ],
    body: {
      type: "object",
      properties: {
        inventoryItemId: {
          type: "string",
        },
        fieldName: {
          type: "number",
        },
        fieldValue: {
          type: "string",
        },
      },
    },
  },

  updateItemPricesSchema: {
    description: "Updates an Inventory items prices, including any listing template prices",
    tags: ["Inventory"],
    summary:
      "This will update an inventory items prices, including any listing templates, and push that updated price to the template.",
    security: [
      {
        token: [],
      },
    ],
    body: {
      type: "object",
      properties: {
        inventoryItemId: {
          type: "string",
        },
        fieldValue: {
          type: "string",
        },
      },
    },
  },

  getOutOfSyncPricesSchema: {
    description: "Query Inventory for prices that are out of sync.",
    tags: ["Inventory"],
    summary:
      "Checks Products Price and Listing/Channel Price against Ebay Listing Price and returns results that dont match. ",
    security: [
      {
        token: [],
      },
    ],

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
                pkStockItemID: {
                  type: "string",
                },
                ItemNumber: {
                  type: "string",
                },
                CategoryName: {
                  type: "string",
                },
                LocationCode: {
                  type: "string",
                },
                Image: {
                  type: "string",
                },
                ItemTitle: {
                  type: "string",
                },
                Quantity: {
                  type: "number",
                },
                InOrderBook: {
                  type: "number",
                },
                OnOrder: {
                  type: "number",
                },
                RetailPrice: {
                  type: "number",
                },
                StockItemPrice: {
                  type: "number",
                },
                eBayListingPrice: {
                  type: "number",
                },
                eBayQty: {
                  type: "number",
                },
                eBayTitle: {
                  type: "string",
                },
                eBaySKU: {
                  type: "string",
                },
                eBayStartTime: {
                  type: "string",
                },
                eBayEndTime: {
                  type: "string",
                },
                eBayListingStatus: {
                  type: "string",
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
  },
};
