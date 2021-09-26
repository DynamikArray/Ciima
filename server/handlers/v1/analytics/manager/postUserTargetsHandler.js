const { USER_TARGET } = require("../../../../../util/auditLog/logResourceTypes");
const { ADD_USER_TARGET } = require("../../../../../util/auditLog/logActionTypes");

module.exports = (fastify) => ({
  postUserTargetsHandler: async (req, reply) => {
    const userTarget = req.body;
    const query = "INSERT INTO slc_user_targets SET ?";

    let successResult,
      errorResult = false;
    try {
      const [rows, fields] = await fastify.mysql.query(query, userTarget);
      successResult = rows;
      return { result: rows };
    } catch (error) {
      if (error.code == "ER_DUP_ENTRY") {
        reply.send(new Error("Record exists already, please change selected user or week."));
      } else {
        errorResult = error;
        fastify.winston.error(error);
        reply.send(error);
      }
    } finally {
      //Handle finally and log result
      fastify.auditLogger.log(
        ADD_USER_TARGET,
        req.user.id,
        successResult ? successResult.insertId : 0,
        USER_TARGET,
        JSON.stringify({ successResult, errorResult, request: req.body })
      );
    }
  },
});
