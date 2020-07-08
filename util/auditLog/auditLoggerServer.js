const auditLogger = {
  mysql: false,
  winston: false,

  initiliaze: (mysqlInstance, winstonInstance) => {
    mysql = mysqlInstance;
    winston = winstonInstance;
  },

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
      const [rows, fields] = await fastify.mysql.query(query, auditItem);
      if (rows.affectedRows == 1) return true;
      throw "AuditLog didnt insert row correctly";
    } catch (error) {
      if (winston) winston.error("auditLoggerServer.log() " + error);
      return false;
    }
  },
};

module.exports = { auditLogger };
