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
    //TODO MAKE PROPER RESPONSE
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {}
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
            properties: {}
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
            properties: {}
          }
        }
      }
    }
  }
};
