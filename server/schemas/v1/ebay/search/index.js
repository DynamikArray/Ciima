module.exports = {
  searchSchema: {
    description: "Search Ebay for sold items",
    tags: ["Ebay"],
    summary: "Search Ebays sold items",

    security: [
      {
        token: [],
      },
    ],

    body: {
      type: "object",
      properties: {
        keywords: {
          type: "array",
          items: {
            type: "string",
          },
        },
        searchType: {
          type: "string",
          enum: ["findCompletedItems", "findItemsAdvanced"],
        },
      },
    },

    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              $: {
                type: "object",
                properties: {
                  count: {
                    type: "string",
                  },
                },
              },

              item: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    //main item properties
                    itemId: { type: "string" },
                    title: { type: "string" },
                    globalId: { type: "string" },
                    primaryCategory: {
                      type: "object",
                      properties: {
                        categoryId: { type: "string" },
                        categoryName: { type: "string" },
                      },
                    },
                    galleryURL: { type: "string" },
                    viewItemURL: { type: "string" },

                    //shipping info
                    shippingInfo: {
                      type: "object",
                      properties: {
                        shippingServiceCost: {
                          type: "object",
                          properties: {
                            amount: { type: "number" },
                            currencyId: { type: "string" },
                          },
                        },
                        shippingType: { type: "string" },
                        shipToLocations: { type: "string" },
                        expeditedShipping: { type: "string" },
                        oneDayShippingAvailable: { type: "string" },
                        handlingTime: { type: "string" },
                      },
                    },

                    //selling status
                    sellingStatus: {
                      type: "object",
                      properties: {
                        currentPrice: {
                          type: "object",
                          properties: {
                            amount: { type: "number" },
                            currencyId: { type: "string" },
                          },
                        },
                        convertedCurrentPrice: {
                          type: "object",
                          properties: {
                            amount: { type: "number" },
                            currencyId: { type: "string" },
                          },
                        },
                        sellingState: { type: "string" },
                        timeLeft: { type: "string" },
                      },
                    },

                    sellerInfo: {
                      type: "object",
                      properties: {
                        sellerUserName: { type: "string" },
                        feedbackScore: { type: "string" },
                        positiveFeedbackPercent: { type: "string" },
                        feedbackRatingStar: { type: "string" },
                        topRatedSeller: { type: "string" },
                      },
                    },

                    listingInfo: {
                      type: "object",
                      properties: {
                        bestOfferEnabled: { type: "boolean" },
                        buyItNowAvailable: { type: "boolean" },
                        startTime: { type: "string" },
                        endTime: { type: "string" },
                        listingType: { type: "string" },
                        gift: { type: "string" },
                      },
                    },

                    returnsAccepted: { type: "string" },
                    galleryPlusPictureURL: { type: "string" },
                    isMultiVariationListing: { type: "string" },
                    topRatedListing: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
