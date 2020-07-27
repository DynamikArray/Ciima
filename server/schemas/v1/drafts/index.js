module.exports = {
  readSchema: {
    description: "Get a list of open drafts from the server",
    tags: ["drafts"],
    summary: "Return a list of open drafts",
    security: [
      {
        token: [],
      },
    ],
    query: {
      createdDate: { type: "string" },
      status: { type: "string" },
      draftType: { type: "string" },
      searchString: { type: "string" },
      limit: { type: "number" },
      page: { type: "number" },
    },
  },
};
