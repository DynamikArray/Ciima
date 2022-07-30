module.exports = {
  searchSalesSchema: {
    description: "Search Sales from Whatnot",
    tags: ["Whatnot"],
    summary: "Search Whatnot sales by various parameters starting with name, date",

    security: [
      {
        token: [],
      },
    ],

    body: {
      type: "object",
      properties: {
        buyer: { type: "string" },
        salesDate: { type: "string" },
      },
    },

    //Write out a repsonse schema later
    response: {
      //200: {},
    },
  },
};
