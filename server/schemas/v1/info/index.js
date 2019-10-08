module.exports = {
  keepAliveSchema: {
    description: "Get the status of the API",
    tags: ["info"],
    summary: "Obtain the status of the API",
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          api: {
            type: "boolean"
          },
          linnworks: {
            type: "object",
            properties: {
              server: {
                type: "string"
              },
              token: {
                type: "string"
              }
            }
          }
        }
      }
    }
  }
};
