module.exports = {
  description: "Submit draft for listing to linnworks",
  tags: ["submitDraft"],
  summary: "Submits the draft to linnworks to be pushed to ebay",

  body: {
    id: { type: "number" }
  }

  //// TODO: defind the repsonse

  /*
  response: {
    200: {
      description: "Succesful response",
      type: "object"

      properties: {
        result: {
          type: "array",
          items: [{ type: "object" }]
        }
      }

    }
  }
  */
};
