const schema = require("../../../schemas/v1/issueSearch");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const handler = require("../../../handlers/v1/issueSearch")(fastify);

  const issueSearch = {
    schema: schema,
    handler: handler.issueSearch
  };

  fastify.get("/issueSearch", issueSearch);
  next();
};
