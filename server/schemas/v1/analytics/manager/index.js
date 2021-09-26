const {
  getUserTargetRequestBody,
  postUserTargetRequestBody,
  putUserTargetRequestBody,
  deleteUserTargetRequestBody,
} = require("./_models");

module.exports = {
  getUserTargetsSchema: {
    description: "Get a list of User target values",
    tags: ["Analytics | User Targets"],
    summary: "Gets a list of all User target values",
    security: [
      {
        token: [],
      },
    ],
    query: getUserTargetRequestBody,
  },

  postUserTargetsSchema: {
    description: "Create a new user target entry",
    tags: ["Analytics | User Targets"],
    summary: "Create a new user target entry",
    security: [
      {
        token: [],
      },
    ],
    body: postUserTargetRequestBody,
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "number",
              },
            },
          },
        },
      },
    },
  },

  putUserTargetsSchema: {
    description: "Edit an existing user target entry",
    tags: ["Analytics | User Targets"],
    summary: "Edit an existing user target entry",
    security: [
      {
        token: [],
      },
    ],
    body: putUserTargetRequestBody,
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "number",
              },
              info: {
                type: "string",
              },
              changedRows: {
                type: "number",
              },
            },
          },
        },
      },
    },
  },

  deleteUserTargetsSchema: {
    description: "Delete an existing user target entry",
    tags: ["Analytics | User Targets"],
    summary: "Delete an existing user target entry",
    security: [
      {
        token: [],
      },
    ],
    body: deleteUserTargetRequestBody,
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "number",
              },
            },
          },
        },
      },
    },
  },
};
