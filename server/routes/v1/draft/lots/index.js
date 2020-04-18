const {
  createSchema,
  checkTitleSchema
  /*readSchema,
  editSchema,
  deleteSchema*/
} = require("../../../../schemas/v1/draft/lots");

/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  //Import handlers and pass fastify obj
  const {
    createHandler,
    checkTitleHandler
    /*readHandler,
    editHandler,
    deleteHandler*/
  } = require("../../../../handlers/v1/draft/lots")(fastify);

  //Create
  const createDraft = {
    preValidation: fastify.authenticate,
    schema: createSchema,
    handler: createHandler
  };
  fastify.post("/draft/lots", createDraft);

  //Check Title
  const checkTitle = {
    preValidation: fastify.authenticate,
    schema: checkTitleSchema,
    handler: checkTitleHandler
  };
  fastify.post("/draft/lots/checkTitle", checkTitle);

  /*
  //READ
  const readDraft = {
    preValidation: fastify.authenticate,
    schema: readSchema,
    handler: readHandler
  };
  fastify.get("/lots/draft/:id", readDraft);

  //EDIT
  const editDraft = {
    preValidation: fastify.authenticate,
    schema: editSchema,
    handler: editHandler
  };
  fastify.put("/lots/draft/:id", editDraft);

  //DELETE
  const deleteDraft = {
    preValidation: fastify.authenticate,
    schema: deleteSchema,
    handler: deleteHandler
  };
  fastify.delete("/lots/draft/:id", deleteDraft);
  */
  next();
};
