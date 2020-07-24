module.exports = {
  readPricelistSchema: {
    description: "Read our Price List of Matched Issues by IssueId.",
    tags: ["Pricelist"],
    summary:
      "Search our list of Matched Issues to a list of other retailers prices ",
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
      "Search our list of Matched Issues to a list of other retailers prices ",
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
