module.exports = {
  keepAlive: {
    description: "Get the status of the API",
    tags: ["Info"],
    summary: "Obtain the status of the API",
    response: {
      200: {
        description: "Succesful response",
        type: "string"
      }
    }
  }
};
