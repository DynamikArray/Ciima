module.exports = (fastify) => {
  const { searchItemsHandler } = require("./searchItemsHandler")(fastify);
  const { submitItemHandler } = require("./submitItemHandler")(fastify);
  const { pendingItemsHandler } = require("./pendingItemsHandler")(fastify);
  const { completedItemsHandler } = require("./completedItemsHandler")(fastify);
  const { finalizeItemHandler } = require("./finalizeItemHandler")(fastify);

  return {
    searchItemsHandler: searchItemsHandler,
    submitItemHandler: submitItemHandler,
    pendingItemsHandler: pendingItemsHandler,
    completedItemsHandler: completedItemsHandler,
    finalizeItemHandler: finalizeItemHandler,
  };
};
