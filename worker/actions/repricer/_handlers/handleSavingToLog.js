const logger = require("../../../../util/winston/winston.js")({
  hostname: "Worker",
});

const mysqlConnPool = require("../../../../util/mysql/mysqlConnPool.js");

const handleSavingToLog = async (item) => {
  const query = "INSERT INTO slc_repricing_log SET ?";
  try {
    const result = await mysqlConnPool.query(query, item);
    if (result.affectedRows == 1) return true;
    throw "Reprice Log didnt insert row correctly";
  } catch (error) {
    logger.error("handleSavingToLog() " + error);
    return false;
  }
};

module.exports = handleSavingToLog;
