module.exports = {
  titleSearch: {
    description: "Search the database",
    tags: ["titles"],
    summary: "Search the database for comics",

    security: [{ token: [] }],

    querystring: {
      query: { type: "string" },
      publisher: { type: "string" },
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
              type: "object",
              properties: {
                titleId: { type: "number" },
                title: { type: "string" },
                publisher: { type: "string" },
                yearsPublished: { type: "string" },
                issueCount: { type: "number" },
                matched: { type: "number" },
              },
            },
          },
        },
      },
    },*/
  },

  upcSearch: {
    description: "Search the database by UPC",
    tags: ["titles"],
    summary: "Search the database for comics",

    security: [{ token: [] }],

    querystring: {
      query: { type: "string" },
      upc: { type: "number" },
    },

    response: {},
  },
};
