module.exports = {
  description:
    "inventorySearch - V2 - Improved Inventory Search in Linnworks for titles",
  tags: ["Inventory"],
  summary:
    "inventorySearch - V2 - Improved Title searching through linnworks inventory",
  security: [
    {
      token: [],
    },
  ],
  body: {
    type: "object",
    properties: {
      searchTitle: {
        type: "string",
      },
      searchLocation: {
        type: "string",
      },
      searchCategories: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },

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
              DeclinePrice: {
                type: "string",
              },
              StartPrice: {
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
};
