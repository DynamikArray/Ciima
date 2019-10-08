module.exports = {
  searchInventorySchema: {
    description: "Search Linnworks Inventory by the 3 main attributes",
    tags: ["inventory"],
    summary: "Search through linnworks inventory using A, B, C",

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
  }
};
