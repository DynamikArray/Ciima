const mysql = require("mysql2");
const { promisify } = require("util");

//our logger
const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

const mysqlCreds = require("../../util/mysql/mysqlConnectionStringParser.js");

const mysqlConnPool = mysql.createPool({
  host: mysqlCreds.host,
  user: mysqlCreds.user,
  password: mysqlCreds.password,
  database: mysqlCreds.database,
  connectionLimit: 10,
  queueLimit: 0
  //waitForConnection: true,
});

mysqlConnPool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      logger.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      logger.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      logger.error("Database connection was refused.");
    }
  }
  if (connection) connection.release();
  return;
});

mysqlConnPool.query = promisify(mysqlConnPool.query);

module.exports = mysqlConnPool;
