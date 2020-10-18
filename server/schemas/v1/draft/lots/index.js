module.exports = {
  createSchema: {
    description: "Creates a Lot Draft record using supplied values. ",
    tags: ["Draft", "Lots"],
    summary: "(C)of the CRUD for Lot Draft records",
    security: [
      {
        token: [],
      },
    ],

    //TODO MAKE PROPER BODY - also doenst seem to be working yet ?
    body: {
      type: "object",
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
                type: "string",
              },
              insertId: {
                type: "string",
              },
            },
          },
        },
      },
    },
  },

  checkTitleSchema: {
    description: "Checks the proposed Draft Title is not a duplicate.",
    tags: ["Lots", "Utility"],
    summary:
      "Checks to make sure that the title we are trying to save for a Lot draft is not already in use by us on ebay",
    security: [
      {
        token: [],
      },
    ],

    //TODO MAKE PROPER BODY - also doenst seem to be working yet ?
    body: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
      },
    },

    /*
    //TODO MAKE PROPER RESPONSE
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              passed: {
                type: "boolean"
              },
              failed: {
                type: "boolean"
              },
              listings: {
                type: "array",
                items: {
                  type: "object"
                }
              }
            }
          }
        }
      }
    }
    */
  },
};
