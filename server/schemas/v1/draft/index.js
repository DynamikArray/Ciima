module.exports = {
  description: "CRUD for a Draft",
  tags: ["draft"],
  summary: "Creat Read Update Delete for draft records",

  //TODO MAKE PROPER BODY - also doenst seem to be working yet ?
  body: {
    type: "object"
  },

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
