const schema = require("../../../schemas/v1/draft");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const handler = require("../../../handlers/v1/draft")(fastify);

  const draft = {
    schema: schema,
    handler: handler.draft
  };

  fastify.post("/draft", draft);
  next();
};
