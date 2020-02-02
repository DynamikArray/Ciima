module.exports = {
  loadInventorySchema: {
    description: "Search EABY TESTING",
    tags: ["inventory"],
    summary: "LOAD ",
    security: [
      {
        token: []
      }
    ]
    /*
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
