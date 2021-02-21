module.exports = (fastify) => {
  const { updateTemplatesBatchHandler } = require("./updateTemplatesBatchHandler")(fastify);
  const { checkLocationCodeHandler } = require("./checkLocationCodeHandler")(fastify);

  return {
    updateTemplatesBatchHandler,
    checkLocationCodeHandler,
  };
};
