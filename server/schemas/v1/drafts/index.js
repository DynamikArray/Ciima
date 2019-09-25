module.exports = {
  description: "Get a list of open drafts from the server",
  tags: ["drafts"],
  summary: "Return a list of open drafts",

  //query params?

  //TODO MAKE PROPER RESPONSE

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
              stockItemId: { type: "string" },
              upc: { type: "string" },
              itemNumber: { type: "string" },
              inventoryTitle: { type: "string" },
              issueNumbers: { type: "string" },
              itemNumber: { type: "string" },
              locationCode: { type: "string" },
              mainCharacter: { type: "string" },
              main_image: { type: "string" },
              other_images: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    imageUrl: { type: "string" }
                  }
                }
              },
              price: { type: "number" },
              publishedDate: { type: "string" },
              publishedYear: { type: "string" },
              publisher: { type: "string" },
              quantity: { type: "number" },
              series: { type: "string" },
              status: { type: "string" },

              statusNotes: {
                anyOf: [
                  { type: "string" },
                  { type: "array", items: { type: "string" } }
                ]
              },

              ebaySiteCategoryId: { type: "number" },
              ebayStoreCategoryIdOne: { type: "number" },
              ebayStoreCategoryIdTwo: { type: "number" }
            }
          }
        }
      }
    }
  }
};
