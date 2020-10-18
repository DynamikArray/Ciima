module.exports = {
  createSchema: {
    description: "Creates a GTC Draft record using supplied values. ",
    tags: ["Draft", "Gtcs"],
    summary: "(C)of the CRUD for GTC Draft records",
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
};
