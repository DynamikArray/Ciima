module.exports = {
  searchInventorySchema: {
    description: "Search Linnworks Inventory by the 3 main attributes",
    tags: ["inventory"],
    summary: "Search through linnworks inventory using A, B, C",
    security: [
      {
        token: []
      }
    ],
    body: {
      type: "object",
      properties: {
        searchString: {
          type: "string"
        }
      }
    }

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
    tags: ["inventory"],
    summary:
      "Update location and or quantity of Inventory items values in Linnworks",
    security: [
      {
        token: []
      }
    ],
    body: {
      type: "object",
      properties: {
        inventoryItemId: {
          type: "string"
        },
        locationId: {
          type: "string"
        },
        fieldName: {
          type: "number"
        },
        fieldValue: {
          type: "string"
        },
        changeSource: {
          type: "string"
        }
      }
    }
  }
};
