module.exports = {
  description: "Get a list of open drafts from the server",
  tags: ["draft"],
  summary: "Return a list of open drafts",

  //query params?

  //TODO MAKE PROPER RESPONSE
  response: {
    200: {
      description: "Succesful response",
      type: "object",
      properties: {
        result: {
          type: "object"
        }
      }
    }
  }
};
