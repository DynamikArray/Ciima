module.exports = (fastify) => {
  const { getUserTargetsHandler } = require("./getUserTargetsHandler")(fastify);
  const { postUserTargetsHandler } = require("./postUserTargetsHandler")(fastify);
  const { putUserTargetsHandler } = require("./putUserTargetsHandler")(fastify);
  const { deleteUserTargetsHandler } = require("./deleteUserTargetsHandler")(fastify);

  return {
    getUserTargetsHandler,
    postUserTargetsHandler,
    putUserTargetsHandler,
    deleteUserTargetsHandler,
  };
};
