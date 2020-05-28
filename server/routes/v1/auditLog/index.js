const {
  searchSchema,
  userListSchema,
  actionListSchema,
} = require("../../../schemas/v1/auditLog");

module.exports = (fastify, opts, next) => {
  const {
    searchHandler,
    userListHandler,
    actionListHandler,
  } = require("../../../handlers/v1/auditLog")(fastify);

  //READ
  const searchAuditLog = {
    preValidation: fastify.authenticate,
    schema: searchSchema,
    handler: searchHandler,
  };
  fastify.get("/auditLog/search", searchAuditLog);

  //UserList
  const auditLogUserList = {
    preValidation: fastify.authenticate,
    schema: userListSchema,
    handler: userListHandler,
  };
  fastify.get("/auditLog/userList", auditLogUserList);

  //ActionList
  const auditLogActionList = {
    preValidation: fastify.authenticate,
    schema: actionListSchema,
    handler: actionListHandler,
  };
  fastify.get("/auditLog/actionList", auditLogActionList);

  next();
};
