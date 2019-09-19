const mysqlConnPool = require("../../util/mysql/mysqlConnPool.js");

const updateDraftStatus = async (id, status) => {
  const query = `UPDATE slc_drafts SET status = ? WHERE id = ?`;
  const results = await mysqlConnPool.query(query, [status, id]);

  if (results.affectedRows === 1) {
    return true;
  }
  return false;
};

module.exports = { updateDraftStatus };
