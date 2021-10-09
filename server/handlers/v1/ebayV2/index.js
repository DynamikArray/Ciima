module.exports = (fastify) => {
  const { getItemAspectsForCategory } = require("./getItemAspectsForCategory")(fastify);

  return {
    getItemAspectsForCategory,
  };
};
