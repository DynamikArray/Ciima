const schema = require("../../schemas/v1/search-schema");
const handler = require("../../handlers/v1/search-handler");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
const routes = fastify => {
  fastify.route({
    method: "GET",
    url: "/search",
    schema: schema.search,
    handler: handler.search
  });
};

module.exports = routes;
