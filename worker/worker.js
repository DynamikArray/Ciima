require("dotenv").config();

//const { logger } = require("../util/winston/winston.js");
const logger = require("../util/winston/winston.js")({
  hostname: "Worker"
});
const { amqp } = require("../util/amqp/amqpConn.js");
const { linnworks } = require("../util/linnworks/linnworks.js");
const { mysqlConnPool } = require("../util/mysql/mysqlConnPool.js");
const { handleMessage } = require("./messageHandler.js")(mysqlConnPool, logger);

const worker = async () => {
  logger.info("Starting worker");
  //connection to amqp
  await amqp.connect();
  //init linnworks connection
  await linnworks.initiliaze(logger);
  // Start consuming:
  amqp.consume(handleMessage);
  // Publishing to arbitrary routing key.
  //await amqp.publish(routingKey, payload, options);
};

//start the worker
worker();

module.exports = { worker };
