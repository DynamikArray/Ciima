module.exports = {
  description: "Submit draft for listing to linnworks",
  tags: ["drafts"],
  summary: "Submits the draft to linnworks to be pushed to ebay",

  security: [
    {
      token: []
    }
  ],

  body: {
    type: "object",
    required: ["draftId"],
    properties: {
      draftId: { type: "number" }
    }
  }

  //// TODO: defind the repsonse

  /*
  response: {
    200: {
      description: "Succesful response",
      type: "object",

      properties: {}
    }
  }
  */
};
