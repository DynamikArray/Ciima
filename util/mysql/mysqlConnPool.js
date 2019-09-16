const mysql = require("mysql2");

const mysqlConnPool = mysql.createPool({
  host: process.env.MYSQL_CONN,
  //waitForConnection: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = { mysqlConnPool };
