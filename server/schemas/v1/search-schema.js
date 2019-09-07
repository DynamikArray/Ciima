module.exports = {
  keepAlive: {
    description: "Search the database",
    tags: ["Search"],
    summary: "Search the database for comics",
    response: {
      200: {
        description: "Succesful response",
        type: "string"
      }
    }
  }
};
