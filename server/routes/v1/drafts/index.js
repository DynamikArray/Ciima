const { readSchema } = require("../../../schemas/v1/drafts");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const { readHandler } = require("../../../handlers/v1/drafts")(fastify);

  const readDrafts = {
    preValidation: fastify.authenticate,
    schema: readSchema,
    handler: readHandler
  };

  //Read Drafts
  fastify.get("/drafts", readDrafts);

  //Call Next()
  next();
};
