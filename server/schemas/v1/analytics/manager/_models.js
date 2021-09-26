module.exports = {
  postUserTargetRequestBody: {
    type: "object",
    properties: {
      userId: {
        type: "number",
      },
      startDate: {
        type: "string",
      },
      endDate: {
        type: "string",
      },
      targetValue: {
        type: "number",
      },
    },
  },

  putUserTargetRequestBody: {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      userId: {
        type: "number",
      },
      startDate: {
        type: "string",
      },
      endDate: {
        type: "string",
      },
      targetValue: {
        type: "number",
      },
    },
  },

  getUserTargetRequestBody: {
    type: "object",
    properties: {
      startDate: {
        type: "string",
      },
      endDate: {
        type: "string",
      },
    },
  },

  deleteUserTargetRequestBody: {
    type: "object",
    properties: {
      userId: {
        type: "number",
      },
    },
  },
};
