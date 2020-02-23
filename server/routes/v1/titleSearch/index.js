const schema = require("../../../schemas/v1/titleSearch");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const handler = require("../../../handlers/v1/titleSearch")(fastify);

  const titleSearch = {
    preValidation: fastify.authenticate,
    schema: schema.titleSearch,
    handler: handler.titleSearch
  };
  fastify.get("/titleSearch", titleSearch);

  const upcSearch = {
    preValidation: fastify.authenticate,
    schema: schema.upcSearch,
    handler: handler.upcSearch
  };
  fastify.get("/upcSearch", upcSearch);

  next();
};
