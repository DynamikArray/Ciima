const mysql = require("mysql2");
const { promisify } = require("util");

//our logger
const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

const mysqlConnPool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  //waitForConnection: true,
  connectionLimit: 10,
  queueLimit: 0
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
