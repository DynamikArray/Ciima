const { USER_TARGET } = require("../../../../../util/auditLog/logResourceTypes");
const { DELETE_USER_TARGET } = require("../../../../../util/auditLog/logActionTypes");

module.exports = (fastify) => ({
  deleteUserTargetsHandler: async (req, reply) => {
    const userTarget = req.body;
    const query = `DELETE FROM slc_user_targets WHERE id=?`;

    let successResult,
      errorResult = false;
    try {
      const [rows, fields] = await fastify.mysql.query(query, userTarget.id);
      successResult = rows;
      return { result: rows };
    } catch (error) {
      errorResult = error;
      fastify.winston.error(error);
      reply.send(error);
    } finally {
      //Handle finally and log result
      fastify.auditLogger.log(
        DELETE_USER_TARGET,
        req.user.id,
        successResult ? successResult.insertId : 0,
        USER_TARGET,
        JSON.stringify({ successResult, errorResult, request: req.body })
      );
    }
  },
});
