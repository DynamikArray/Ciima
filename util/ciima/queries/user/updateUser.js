const { USER_ACCOUNT } = require("../../../auditLog/logResourceTypes");
const { UPDATE_USER_ACCOUNT } = require("../../../auditLog/logActionTypes");

const queryUpdateUser = async (fastify, userId, fieldData) => {
  const params = {};
  if (fieldData.displayname) params.displayname = fieldData.displayname;
  if (fieldData.displaycolor) params.displaycolor = fieldData.displaycolor;

  const query = `UPDATE slc_users SET ? where id=${userId};`;

  let successResult,
    errorResult = false;
  try {
    const [rows, fields] = await fastify.mysql.query(query, params);
    const { affectedRows, insertId } = rows;
    successResult = rows;
    return { result: { affectedRows, insertId } };
  } catch (error) {
    errorResult = error;
    fastify.winston.error(error);
    return { error: error.message, result: false };
  } finally {
    fastify.auditLogger.log(
      UPDATE_USER_ACCOUNT,
      userId,
      successResult.insertId || 0,
      USER_ACCOUNT,
      JSON.stringify({ successResult, errorResult })
    );
  }
};

module.exports = { queryUpdateUser };
