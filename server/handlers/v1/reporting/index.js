module.exports = (fastify) => {
  const { getSoldItemsHandler } = require("./getSoldItems")(fastify);
  const { getCategorySalesHandler } = require("./getCategorySales")(fastify);

  return {
    getSoldItems: getSoldItemsHandler,
    getCategorySales: getCategorySalesHandler,
  };
};
