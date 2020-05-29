const logger = require("../../util/winston/winston.js")({
  hostname: "Worker",
});
const mysqlConnPool = require("../mysql/mysqlConnPool.js");

const auditLogger = {
  log: async (action, user_id, resource_id, resource_type, meta = {}) => {
    const auditItem = {
      action,
      user_id,
      resource_id,
      resource_type,
      meta,
    };
    const query = "INSERT INTO slc_audit_log SET ?";
    try {
      const result = await mysqlConnPool.query(query, auditItem);
      if (result.affectedRows == 1) return true;
      throw "AuditLog didnt insert row correctly";
    } catch (error) {
      logger.error("auditLoggerWorker.log() " + error);
      return false;
    }
  },
};

module.exports = auditLogger;
