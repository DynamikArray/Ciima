const mysql = require("mysql2");
const { promisify } = require("util");

//our logger
const logger = require("../../util/winston/winston.js")({
  hostname: "Worker",
});

//
// const mysqlCreds = require("../../util/mysql/mysqlConnectionStringParser.js");
//
const mySqlCreds = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
};

const mysqlConnPool = mysql.createPool({
  host: mySqlCreds.host,
  user: mySqlCreds.user,
  password: mySqlCreds.password,
  database: mySqlCreds.database,
  connectionLimit: 10,
  queueLimit: 0,
  waitForConnections: true,
});

mysqlConnPool.query = promisify(mysqlConnPool.query);

module.exports = mysqlConnPool;
