module.exports = {
  description: "Search For Ebay Categories",
  tags: ["ebay"],
  summary: "Search the database for the Ebay category",

  querystring: {
    q: { type: "string" }
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
              id: { type: "number" },
              ebayCategoryId: { type: "number" },
              ebayCategoryName: { type: "string" }
            }
          }
        }
      }
    }
  }
};
