const { createSchema } = require("../../../../schemas/v1/draft/gtcs");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  //Import handlers and pass fastify obj
  const { createHandler } = require("../../../../handlers/v1/draft/gtcs")(
    fastify
  );

  //Create
  const createDraft = {
    preValidation: fastify.authenticate,
    schema: createSchema,
    handler: createHandler,
  };
  fastify.post("/draft/gtcs", createDraft);

  next();
};
