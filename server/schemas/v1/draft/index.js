module.exports = {
  createSchema: {
    description: "Creates a draft record using supplied values. ",
    tags: ["drafts"],
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
  }
};
