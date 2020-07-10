/*
  USER SCHEMAS
*/

module.exports = {
  loginSchema: {
    description: "Login using user/pass to get back a jwt",
    tags: ["user"],
    summary: "Obtain a JWT to use through the app",
    body: {
      type: "object",
      properties: {
        username: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },

    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          id: { type: "string" },
          username: { type: "string" },
          email: { type: "string" },
          token: { type: "string" },
        },
      },
      403: {
        description: "Forbidden Username/Password not valid.",
        type: "string",
      },
    },
  },

  registerSchema: {
    description: "Register a new user into the application.",
    tags: ["user"],
    summary: "Register a new user to the application",
    body: {
      type: "object",
      properties: {
        username: {
          type: "string",
        },
        displayname: {
          type: "string",
        },
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          id: { type: "string" },
          username: { type: "string" },
          displayname: { type: "string" },
          email: { type: "string" },
          created_at: { type: "string" },
          updated_at: { type: "string" },
        },
      },
    },
  },

  accountSchema: {
    description: "Account route allows to get back user profile.",
    tags: ["user"],
    summary: "Use JWT to account information",
    security: [
      {
        token: [],
      },
    ],
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          id: { type: "string" },
          username: { type: "string" },
          displayname: { type: "string" },
          email: { type: "string" },
          token: { type: "string" },
        },
      },
    },
  },
};
