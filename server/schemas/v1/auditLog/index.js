module.exports = {
  searchSchema: {
    description: "Search and view all Audit Logs",
    tags: ["Audit Log"],
    summary:
      "Return a list of Audit Logs mathcing criteria or all if no criteria",
    security: [
      {
        token: [],
      },
    ],
    /*
    querystring: {
      status: { type: "string" },
      all: { type: "number" }
    }
    */
  },

  userListSchema: {
    description: "List of username and ids for dropdown list",
    tags: ["Audit Log"],
    summary: "Return a list of usernames to be used in the Audit Filters",
    security: [
      {
        token: [],
      },
    ],
  },

  actionListSchema: {
    description: "Actions lists ",
    tags: ["Audit Log"],
    summary: "Return a list of all Action Types",
    security: [
      {
        token: [],
      },
    ],
  },
};
