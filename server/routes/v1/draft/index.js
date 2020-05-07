const {
  createSchema,
  readSchema,
  editSchema,
  deleteSchema,
  updateSchema
} = require("../../../schemas/v1/draft");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  //Import handlers and pass fastify obj
  const {
    createHandler,
    readHandler,
    editHandler,
    deleteHandler,
    updateHandler
  } = require("../../../handlers/v1/draft")(fastify);

  //Create
  const createDraft = {
    preValidation: fastify.authenticate,
    schema: createSchema,
    handler: createHandler
  };
  fastify.post("/draft/create", createDraft);

  //READ
  const readDraft = {
    preValidation: fastify.authenticate,
    schema: readSchema,
    handler: readHandler
  };
  fastify.get("/draft/:id", readDraft);

  //EDIT
  const editDraft = {
    preValidation: fastify.authenticate,
    schema: editSchema,
    handler: editHandler
  };
  fastify.put("/draft/:id", editDraft);

  //DELETE
  const deleteDraft = {
    preValidation: fastify.authenticate,
    schema: deleteSchema,
    handler: deleteHandler
  };
  fastify.delete("/draft/:id", deleteDraft);

  //updateDraft --inline editing single field
  const updateDraft = {
    preValidation: fastify.authenticate,
    schema: updateSchema,
    handler: updateHandler
  };
  fastify.put("/draft/:id/updateField", updateDraft);

  next();
};
