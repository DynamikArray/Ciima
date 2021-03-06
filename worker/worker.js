require("dotenv").config();

const scheduler = require("./scheduler");

const logger = require("../util/winston/winston.js")({
  hostname: "Worker",
});

const amqpWrapper = require("../util/amqp/amqplib.js");

const { linnworks } = require("../util/linnworks/linnworks.js");
const { messageHandler } = require("./messageHandler.js");

const worker = async () => {
  //init linnworks connection
  await linnworks.initiliaze(logger);

  logger.info(`Starting worker!`);

  // Consumer
  await amqpWrapper.CONNECTION.then(function (conn) {
    return conn.createChannel();
  }).then(function (ch) {
    return ch.assertQueue(amqpWrapper.QUEUE_NAME).then(function (ok) {
      ch.prefetch(5);
      return ch.consume(amqpWrapper.QUEUE_NAME, async function (msg) {
        if (msg !== null) {
          const payload = JSON.parse(msg.content);
          if (payload) {
            await messageHandler(payload);
          }
          ch.ack(msg);
        }
      });
    });
  });

  logger.info(`Running worker!`);
};

//start the worker
worker();
//RIGHT NOW ONLY RUN THE SCHEDULER IN PROD
if (
  //true
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV !== "development"
) {
  logger.info(`Starting Scheduler!`);
  scheduler();
}

module.exports = { worker };
