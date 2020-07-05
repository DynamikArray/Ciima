module.exports = {
  analyticsSearchSchema: {
    description: "Search audit logs and creats analytics data",
    tags: ["Analytics"],
    summary:
      "Return a list of User analytics based off the CREATE_DRAFT and UPDATE_ITEM actions",
    security: [
      {
        token: [],
      },
    ],
    querystring: {
      type: "object",
      properties: {
        days: { type: "number" },
        userId: { type: "string" },
      },
    },
  },
};
