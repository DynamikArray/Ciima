module.exports = {
  checkLocationCodeSchema: {
    description: "Search Linnworks Inventory by the location code",
    tags: ["Utility"],
    summary:
      "Search Linnworks Inventory by the location code and see if it has inventory in it",
    security: [
      {
        token: [],
      },
    ],
    body: {
      type: "object",
      properties: {
        locationCode: {
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
};
