module.exports = {
  readPricelistSchema: {
    description: "Fetch an Issue Match based on our issues by IssueId.",
    tags: ["Pricelist"],
    summary: "Gets a Issue Match record for our specific IssueId",
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

  searchPricelistSchema: {
    description: "Search our Price List of Matched Issues.",
    tags: ["Pricelist"],
    summary:
      "Search our list of Matched Issues to a list of other retailers prices",
    security: [
      {
        token: [],
      },
    ],
    body: {
      type: "object",
      properties: {
        searchString: {
          type: "string",
        },
        /*
        searchType: {
          type: "string",
          enum: ["ebayEnded", "ebayActive", "myComicShop"],
        },
        */
      },
    },

    /*
    response: {
      200: {
        description: "Succesful response",
        type: "object"
      }
    }
    */
  },
};
