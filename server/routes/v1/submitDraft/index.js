const schema = require("../../../schemas/v1/submitDraft");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const handler = require("../../../handlers/v1/submitDraft")(fastify);

  const submitDraft = {
    schema: schema,
    handler: handler.submitDraft
  };

  fastify.post("/submitDraft", submitDraft);
  next();
};
