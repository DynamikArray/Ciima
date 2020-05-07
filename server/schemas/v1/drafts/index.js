module.exports = {
  readSchema: {
    description: "Get a list of open drafts from the server",
    tags: ["drafts"],
    summary: "Return a list of open drafts",
    security: [
      {
        token: []
      }
    ],
    querystring: {
      status: { type: "string" },
      all: { type: "number" }
    }
  }
};
