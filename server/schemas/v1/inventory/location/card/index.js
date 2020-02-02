module.exports = {
  //
  //
  //
  createCardSchema: {
    description: "Create an Inventory Location Card for an existing Box",
    tags: ["Location - Cards"],
    summary: "Create an Inventory Location Card for an existing Box ",
    security: [
      {
        token: []
      }
    ],

    body: {
      type: "object",
      properties: {
        box_id: {
          type: "number"
        },
        card: {
          type: "number"
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
  createCardsSchema: {
    description:
      "Create (MANY-SEQUENTIAL) Inventory Location Cards for an existing Box",
    tags: ["Location - Cards"],
    summary:
      "Create many sequential Inventory Location Cards for an existing Box ",
    security: [
      {
        token: []
      }
    ],

    body: {
      type: "object",
      properties: {
        box_id: {
          type: "number"
        },
        cardFirst: {
          type: "number"
        },
        cardLast: {
          type: "number"
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
  //
  readCardSchema: {
    description: "Read an Inventory Location Card",
    tags: ["Location - Cards"],
    summary: "Read an Inventory Location Card",
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
              box_id: { type: "number" },
              card: { type: "string" },
              notes: { type: "string" }
            }
          }
        }
      }
    }
  },
  //
  //
  updateCardSchema: {
    description: "Update an Inventory Location Card",
    tags: ["Location - Cards"],
    summary: "Update an Inventory Location Card",
    security: [
      {
        token: []
      }
    ],
    body: {
      type: "object",
      properties: {
        box_id: {
          type: "number"
        },
        card: {
          type: "number"
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
  deleteCardSchema: {
    description: "Delete an Inventory Location Card",
    tags: ["Location - Cards"],
    summary: "Delete an Inventory Location Card",
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
  //
  searchCardsSchema: {
    description: "Searches through Inventory Location Cards",
    tags: ["Location - Cards"],
    summary:
      "Search inventory location cards, displays most recent results by default (Limit 500 results) ",
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
        box_id: {
          type: "number"
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
  //
  inventoryCardSchema: {
    description: "Read Inventory from a specifc Locations Card",
    tags: ["Location - Cards"],
    summary: "Read Inventory from a specific Locations Card",
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
              box_id: { type: "number" },
              card: { type: "string" },
              notes: { type: "string" }
            }
          }
        }
      }
    }
    */
  }
};
