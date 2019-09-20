const mysqlConnPool = require("../../util/mysql/mysqlConnPool.js");

const updateDraftStatus = async (id, status, statusNotes = "") => {
  const query = `UPDATE slc_drafts SET status = ?, statusNotes = ? WHERE id = ?`;
  const results = await mysqlConnPool.query(query, [status, statusNotes, id]);

  if (results.affectedRows === 1) {
    return true;
  }
  return false;
};

module.exports = { updateDraftStatus };
