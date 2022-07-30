module.exports = {
  uploadSalesFileSchema: {
    description: "Upload Sales File For Whatnot",
    tags: ["Whatnot"],
    summary: "Upload Whatnot sales FileDate Format should match - yyyy/MM/dd  2020/01/15",

    security: [
      {
        token: [],
      },
    ],

    body: {
      type: "object",
      properties: {
        file: { type: "object" },
        fileDate: { type: "string" },
      },
      required: ["file", "fileDate"],
    },

    response: {
      //200: {},
    },
  },
};
