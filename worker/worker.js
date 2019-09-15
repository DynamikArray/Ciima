const { logger } = require("../shared/winston.js");
const { amqp } = require("./amqpConn.js");

const { linnworks } = require("./util/linnworks.js");

const { messageHandler } = require("./messageHandler.js");

const worker = async () => {
  logger.info("Starting worker");
  //connection to amqp
  await amqp.connect();

  //init linnworks connection
  await linnworks.initiliaze();

  // Start consuming:
  amqp.consume(messageHandler);

  // Publishing to arbitrary routing key.
  //await amqp.publish(routingKey, payload, options);
};

//start the worker
worker();

module.exports = { worker };
