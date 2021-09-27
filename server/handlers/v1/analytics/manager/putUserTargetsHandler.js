const { USER_TARGET } = require("../../../../../util/auditLog/logResourceTypes");
const { UPDATE_USER_TARGET } = require("../../../../../util/auditLog/logActionTypes");

module.exports = (fastify) => ({
  putUserTargetsHandler: async (req, reply) => {
    const userTarget = req.body;
    const query = `UPDATE slc_user_targets SET targetValue = ${userTarget.targetValue} WHERE id=${userTarget.id}`;

    let successResult,
      errorResult = false;
    try {
      const [rows, fields] = await fastify.mysql.query(query);
      successResult = rows;
      return { result: rows };
    } catch (error) {
      errorResult = error;
      fastify.winston.error(error);
      reply.send(error);
    } finally {
      //Handle finally and log result
      fastify.auditLogger.log(
        UPDATE_USER_TARGET,
        req.user.id,
        successResult ? successResult.insertId : 0,
        USER_TARGET,
        JSON.stringify({ successResult, errorResult, request: req.body })
      );
    }
  },
});
