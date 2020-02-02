module.exports = {
  //
  //
  //
  createBoxSchema: {
    description: "Create an Inventory Location Box",
    tags: ["Location - Boxes"],
    summary:
      "Create an Inventory Location Box to hold inventory location cards",
    security: [
      {
        token: []
      }
    ],
    body: {
      type: "object",
      properties: {
        box: {
          type: "string"
        },
        box_type: {
          type: "string",
          enum: ["LOTS", "SETS", "SINGLES", "ADULTS"]
        },
        notes: {
          type: "string"
        }
      }
    },

    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "string"
              },
              insertId: {
                type: "string"
              }
            }
          }
        }
      }
    }
  },

  //
  //
  //
  readBoxSchema: {
    description: "Read an Inventory Location Box",
    tags: ["Location - Boxes"],
    summary: "Read an Inventory Location Box",
    security: [
      {
        token: []
      }
    ],
    //router parameters
    params: {
      type: "object",
      properties: {
        id: { type: "number" }
      }
    },

    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              id: { type: "number" },
              box: { type: "string" },
              notes: { type: "string" }
            }
          }
        }
      }
    }
  },

  //
  //
  //
  updateBoxSchema: {
    description: "Update an Inventory Location Box",
    tags: ["Location - Boxes"],
    summary: "Update an Inventory Location Box",
    security: [
      {
        token: []
      }
    ],
    body: {
      type: "object",
      properties: {
        box: {
          type: "string"
        },
        box_type: {
          type: "string",
          enum: ["LOTS", "SETS", "SINGLES", "ADULTS"]
        },
        notes: {
          type: "string"
        }
      }
    },

    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "number"
              },
              changedRows: {
                type: "number"
              }
            }
          }
        }
      }
    }
  },

  //
  //
  //
  deleteBoxSchema: {
    description: "Delete an Inventory Location Box",
    tags: ["Location - Boxes"],
    summary: "Delete an Inventory Location Box",
    security: [
      {
        token: []
      }
    ],
    params: {
      type: "object",
      properties: {
        id: { type: "number" }
      }
    },
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "number"
              }
            }
          }
        }
      }
    }
  },

  //
  //
  searchBoxesSchema: {
    description: "Searches through Inventory Location Boxes",
    tags: ["Location - Boxes"],
    summary: "Search inventory location boxes",
    security: [
      {
        token: []
      }
    ],

    body: {
      type: "object",
      properties: {
        search: {
          type: "string"
        },
        pageLimit: {
          type: "number"
        },
        nextPageId: {
          type: "string"
        },
        pageDir: {
          type: "string",
          enum: ["prev", "next"]
        }
      }
    }
    /*
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              affectedRows: {
                type: "number"
              }
            }
          }
        }
      }
    }
    */
  },

  //
  //
  //
  inventoryBoxSchema: {
    description: "Read all the Inventory from a Locations Box",
    tags: ["Location - Boxes"],
    summary: "Read all the Inventory from a Locations Box",
    security: [
      {
        token: []
      }
    ],
    //router parameters
    params: {
      type: "object",
      properties: {
        id: { type: "number" }
      }
    }

    /*
    response: {
      200: {
        description: "Succesful response",
        type: "object",
        properties: {
          result: {
            type: "object",
            properties: {
              id: { type: "number" },
              box: { type: "string" },
              notes: { type: "string" }
            }
          }
        }
      }
    }
    */
  }
};
