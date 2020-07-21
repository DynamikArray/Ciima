module.exports = {
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
};
