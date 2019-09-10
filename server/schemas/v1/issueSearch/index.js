module.exports = {
  description: "Search the database",
  tags: ["issueSearch"],
  summary: "Search the database for comics",

  querystring: {
    title: { type: "string" }
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
              title: { type: "string" },
              issueNumber: { type: "number" },
              issueOrder: { type: "string" },
              variation: { type: "string" },
              printing: { type: "number" },
              fullIssue: { type: "string" },
              notes: { type: "string" },
              notesText: { type: "string" },
              storylines: { type: "string" },
              coverDate: { type: "string" },
              writer: { type: "string" },
              artist: { type: "string" },
              coverArtist: { type: "string" },
              appearances: { type: "string" },
              upc: { type: "string" },
              imageUrl: { type: "string" },
              eBayCat1: { type: "number" },
              eBayCat2: { type: "number" },
              issuesCount: { type: "number" },
              publisher: { type: "string" },
              yearsPublished: { type: "string" }
            }
          }
        }
      }
    }
  }
};
