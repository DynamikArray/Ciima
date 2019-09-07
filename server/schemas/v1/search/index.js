module.exports = {
  description: "Search the database",
  tags: ["Search"],
  summary: "Search the database for comics",

  querystring: {
    q: { type: "string" }
  },

  response: {
    200: {
      description: "Succesful response",
      type: "array",
      items: {
        type: "object",
        properties: {
          TitleID: { type: "number" },
          Title: { type: "string" },
          Publisher: { type: "string" }
        }
      }
    }
  }
};
