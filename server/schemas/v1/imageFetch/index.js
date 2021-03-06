module.exports = {
  imageFetch: {
    description: "Fetch the image for our app",
    tags: ["images"],
    summary: "Fetch the image for our app",

    querystring: {
      url: { type: "string" }
    }

    /*
    response: {
      200: {
        description: "Succesful response",
        type: "string"
      }
    }
    */
  }
};
