//Import Schemas
const {
  createBoxSchema,
  readBoxSchema,
  updateBoxSchema,
  deleteBoxSchema,
  searchBoxesSchema,
  inventoryBoxSchema
} = require("../../../../schemas/v1/inventory/location/box");

const {
  createCardSchema,
  createCardsSchema,
  readCardSchema,
  updateCardSchema,
  deleteCardSchema,
  searchCardsSchema,
  inventoryCardSchema
} = require("../../../../schemas/v1/inventory/location/card");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  //Import handlers with fastify obj
  //BOXES
  const {
    createBoxHandler,
    readBoxHandler,
    updateBoxHandler,
    deleteBoxHandler,
    searchBoxesHandler,
    inventoryBoxHandler
  } = require("../../../../handlers/v1/inventory/location/box")(fastify);

  //Create Box
  const createBox = {
    preValidation: fastify.authenticate,
    schema: createBoxSchema,
    handler: createBoxHandler
  };

  //Read Box
  const readBox = {
    preValidation: fastify.authenticate,
    schema: readBoxSchema,
    handler: readBoxHandler
  };

  //Update Box
  const updateBox = {
    preValidation: fastify.authenticate,
    schema: updateBoxSchema,
    handler: updateBoxHandler
  };

  //Delete Box
  const deleteBox = {
    preValidation: fastify.authenticate,
    schema: deleteBoxSchema,
    handler: deleteBoxHandler
  };

  //Inventory Box
  const inventoryBox = {
    preValidation: fastify.authenticate,
    schema: inventoryBoxSchema,
    handler: inventoryBoxHandler
  };

  //http verbs
  fastify.post("/inventory/location/box", createBox);
  fastify.get("/inventory/location/box/:id", readBox);
  fastify.put("/inventory/location/box/:id", updateBox);
  fastify.delete("/inventory/location/box/:id", deleteBox);
  fastify.post("/inventory/location/box/:id/products", inventoryBox);

  //
  //  CARDS
  //
  const {
    createCardHandler,
    createCardsHandler,
    readCardHandler,
    updateCardHandler,
    deleteCardHandler,
    searchCardsHandler,
    inventoryCardHandler
  } = require("../../../../handlers/v1/inventory/location/card")(fastify);

  //Create CArd
  const createCard = {
    preValidation: fastify.authenticate,
    schema: createCardSchema,
    handler: createCardHandler
  };

  //Create Cards   (MANY)
  const createCards = {
    preValidation: fastify.authenticate,
    schema: createCardsSchema,
    handler: createCardsHandler
  };

  //Read Card
  const readCard = {
    preValidation: fastify.authenticate,
    schema: readCardSchema,
    handler: readCardHandler
  };

  //Update card
  const updateCard = {
    preValidation: fastify.authenticate,
    schema: updateCardSchema,
    handler: updateCardHandler
  };

  //Delete Card
  const deleteCard = {
    preValidation: fastify.authenticate,
    schema: deleteCardSchema,
    handler: deleteCardHandler
  };

  //Inventory Card
  const inventoryCard = {
    preValidation: fastify.authenticate,
    schema: inventoryCardSchema,
    handler: inventoryCardHandler
  };

  //http verbs
  fastify.post("/inventory/location/card", createCard);
  fastify.post("/inventory/location/cards", createCards);
  fastify.get("/inventory/location/card/:id", readCard);
  fastify.put("/inventory/location/card/:id", updateCard);
  fastify.delete("/inventory/location/card/:id", deleteCard);
  fastify.post("/inventory/location/card/:id/products", inventoryCard);

  //
  //  Searches
  //
  //  Search Boxes
  const searchBoxes = {
    preValidation: fastify.authenticate,
    schema: searchBoxesSchema,
    handler: searchBoxesHandler
  };

  const searchCards = {
    preValidation: fastify.authenticate,
    schema: searchCardsSchema,
    handler: searchCardsHandler
  };

  fastify.post("/inventory/location/boxes/search", searchBoxes);
  fastify.post("/inventory/location/cards/search", searchCards);

  next();
};
