const schema = require("../../../schemas/v1/drafts");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const handler = require("../../../handlers/v1/drafts")(fastify);

  const drafts = {
    schema: schema,
    handler: handler.drafts
  };

  fastify.get("/drafts", drafts);
  next();
};
