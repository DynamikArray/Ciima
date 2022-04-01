module.exports = (fastify) => {
  const { getItemAspectsForCategory } = require("./getItemAspectsForCategory")(fastify);
  const { getEbaySiteCategories } = require("./getEbaySiteCategories")(fastify);

  return {
    getItemAspectsForCategory,
    getEbaySiteCategories,
  };
};
