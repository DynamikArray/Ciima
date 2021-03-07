module.exports = {
  description: "inventoryItem Select To Clone - Used to Clone GTC item from inventory into GTCS draft",
  tags: ["Inventory"],
  summary: "inventoryItem Select To Clone - Used to Clone GTC item from inventory into GTCS draft",
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
              ExtraDescription: {
                type: "string",
              },
              MainCharacter: {
                type: "string",
              },
              Publisher: {
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
