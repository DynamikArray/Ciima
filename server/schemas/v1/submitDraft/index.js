module.exports = {
  description: "Submit draft for listing to linnworks",
  tags: ["drafts"],
  summary: "Submits the draft to linnworks to be pushed to ebay",

  body: {
    draftId: { type: "Number" }
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
