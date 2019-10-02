module.exports = {
  description: "Search the database",
  tags: ["titles"],
  summary: "Search the database for comics",

  security: [
    {
      token: []
    }
  ],

  querystring: {
    query: { type: "string" },
    advanced: { type: "number" }
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
              titleId: { type: "number" },
              title: { type: "string" },
              publisher: { type: "string" },
              yearsPublished: { type: "string" },
              issueCount: { type: "number" }
            }
          }
        }
      }
    }
  }
};
