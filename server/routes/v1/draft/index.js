const { createSchema } = require("../../../schemas/v1/draft");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const { createHandler } = require("../../../handlers/v1/draft")(fastify);

  const createDraft = {
    preValidation: fastify.authenticate,
    schema: createSchema,
    handler: createHandler
  };

  fastify.post("/draft/create", createDraft);
  next();
};
