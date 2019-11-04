module.exports = {
  pricingSchema: {
    description: "Search for a products price.",
    tags: ["pricing"],
    summary:
      "Search for a products price using a keyword string and a choosen provider",

    security: [
      {
        token: []
      }
    ],

    body: {
      type: "object",
      properties: {
        searchString: {
          type: "string"
        },
        searchType: {
          type: "string",
          enum: ["ebayEnded", "ebayActive", "myComicShop"]
        }
      }
    }

    /*
    response: {
      200: {
        description: "Succesful response",
        type: "object"
      }
    }
    */
  }
};
