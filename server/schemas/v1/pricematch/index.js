module.exports = {
  //
  searchOurIssuesSchema: {
    description: "Search our issues ",
    tags: ["Pricematch"],
    summary:
      "Search our issues from selected title.  Results include pricematch status, and other meta data",
    security: [
      {
        token: [],
      },
    ],
    querystring: {
      type: "object",
      properties: {
        filterVariants: { type: "boolean" },
        filterComicTypes: { type: "boolean" },
        filterHasMatch: { type: "boolean" },
        title: { type: "string" },
        page: { type: "string" },
        pageLimit: { type: "string" },
      },
      required: ["title"],
    },
    /* NEEDS RESPONSES **/
  },

  //
  searchTheirTitlesSchema: {
    description: "Search online retialer for Prices",
    tags: ["Pricematch"],
    summary:
      "Search specifiec website, parse and returns results in json to us",
    security: [
      {
        token: [],
      },
    ],

    querystring: {
      type: "object",
      properties: {
        query: { type: "string" },
      },
    },
    /* NEEDS RESPONSES **/
  },

  //
  searchTheirIssuesSchema: {
    description: "Search online retailers Issues using their Title id",
    tags: ["Pricematch"],
    summary:
      "Search specifiec website using supplied parameters, parse and returns results in json to us",
    security: [
      {
        token: [],
      },
    ],
    querystring: {
      type: "object",
      properties: {
        TID: { type: "string" },
      },
    },
    /* NEEDS RESPONSES **/
  },

  //
  getPageTheirIssuesSchema: {
    description: "Search online retailers Issues using their Title id",
    tags: ["Pricematch"],
    summary:
      "Search specifiec website using supplied parameters, parse and returns results in json to us",
    security: [
      {
        token: [],
      },
    ],
    querystring: {
      type: "object",
      properties: {
        tid: { type: "string" },
        pgi: { type: "string" },
      },
    },
    /* NEEDS RESPONSES **/
  },

  createIssueMatchSchema: {
    description: "Create a issue match with pricing data",
    tags: ["Pricematch"],
    summary: "Creates a IssueMatch record for web retailers issue to our issue",
    security: [
      {
        token: [],
      },
    ],
    body: {
      type: "object",
      properties: {
        slc_IssueId: {
          type: "number",
        },
        mcs_TID: {
          type: "number",
        },
        issueUniqueId: {
          type: "string",
        },
        issueNumber: {
          type: "string",
        },
        issueTitle: {
          type: "string",
        },
        issuePrices: {
          type: "array",
        },
        issueTags: {
          type: "array",
        },
        issuePublisher: {
          type: "string",
        },
        issueDate: {
          type: "string",
        },
        issueThumbnail: {
          type: "string",
        },
        issueFullsize: {
          type: "string",
        },
      },
    },
    /* NEEDS RESPONSES **/
  },

  updateIssueMatchSchema: {
    description: "Update an issue match with pricing data",
    tags: ["Pricematch"],
    summary:
      "Updates an existing IssueMatch record for web retailers issue to our new issue",
    security: [
      {
        token: [],
      },
    ],
    body: {
      type: "object",
      required: ["slc_IssueId"],
      properties: {
        slc_IssueId: {
          type: "number",
        },
        mcs_TID: {
          type: "number",
        },
        issueUniqueId: {
          type: "string",
        },
        issueNumber: {
          type: "string",
        },
        issueTitle: {
          type: "string",
        },
        issuePrices: {
          type: "array",
        },
        issueTags: {
          type: "array",
        },
        issuePublisher: {
          type: "string",
        },
        issueDate: {
          type: "string",
        },
        issueThumbnail: {
          type: "string",
        },
        issueFullsize: {
          type: "string",
        },
      },
    },
    /* NEEDS RESPONSES **/
  },

  deleteIssueMatchSchema: {
    description: "Delete an item from Matched Issues by IssueId.",
    tags: ["Pricelist"],
    summary: "Delete an item from Matched Issues by IssueId.",
    security: [
      {
        token: [],
      },
    ],
    params: {
      slc_IssueId: {
        type: "number",
      },
    },
  },
};
