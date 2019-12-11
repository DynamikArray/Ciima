module.exports = {
  createSchema: {
    description: "Creates a draft record using supplied values. ",
    tags: ["Draft"],
    summary: "(C)of the CRUD for draft records",
    security: [
      {
        token: []
      }
    ],
    //TODO MAKE PROPER BODY - also doenst seem to be working yet ?
    body: {
      type: "object"
    },

    //TODO MAKE PROPER RESPONSE
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "string"
              },
              insertId: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },

  readSchema: {
    description: "Read a draft record using supplied values. ",
    tags: ["Draft"],
    summary: "(R)ead of the CRUD for draft records",
    security: [
      {
        token: []
      }
    ],
    //router parameters
    params: {
      type: "object",
      properties: {
        id: { type: "number" }
      }
    },
    //draft item response
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              id: { type: "number" },
              inventoryTitle: { type: "string" },
              extraDescription: { type: "string" },
              locationCode: { type: "string" },
              grade: { type: "string" },
              quantity: { type: "number" },
              price: { type: "string" },
              ebaySiteCategoryId: { type: "string" },
              ebayStoreCategoryIdOne: { type: "string" },
              ebayStoreCategoryIdTwo: { type: "string" },
              series: { type: "string" },
              mainCharacter: { type: "string" },
              issueNumbers: { type: "string" },
              publisher: { type: "string" },
              publishedYear: { type: "string" },
              publishedDate: { type: "string" },
              main_image: { type: "string" },
              other_images: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    imageUrl: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  },

  editSchema: {
    description: "Edit a draft record using supplied values. ",
    tags: ["Draft"],
    summary: "(E)dit of the CRUD for draft records",
    security: [
      {
        token: []
      }
    ],
    //TODO MAKE PROPER BODY - also doenst seem to be working yet ?
    body: {
      type: "object",
      properties: {
        inventoryTitle: { type: "string" },
        extraDescription: { type: "string" },
        locationCode: { type: "string" },
        grade: { type: "string" },
        quantity: { type: "number" },
        price: { type: "string" },
        ebaySiteCategoryId: { type: "string" },
        ebayStoreCategoryIdOne: { type: "string" },
        ebayStoreCategoryIdTwo: { type: "string" },
        series: { type: "string" },
        mainCharacter: { type: "string" },
        issueNumbers: { type: "string" },
        publisher: { type: "string" },
        publishedYear: { type: "string" },
        publishedDate: { type: "string" }
      }
    },

    //TODO MAKE PROPER RESPONSE
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "number"
              },
              changedRows: {
                type: "number"
              }
            }
          }
        }
      }
    }
  },

  deleteSchema: {
    description: "Deletes a draft record using supplied values. ",
    tags: ["Draft"],
    summary: "(D)elete of the CRUD for draft records",
    security: [
      {
        token: []
      }
    ],
    //TODO MAKE PROPER BODY - also doenst seem to be working yet ?
    params: {
      id: {
        type: "string"
      }
    },

    //TODO MAKE PROPER RESPONSE
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "number"
              }
            }
          }
        }
      }
    }
  }
};
