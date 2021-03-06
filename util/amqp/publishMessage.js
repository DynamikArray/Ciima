const amqpWrapper = require("./amqplib.js");

/**
 * [publishMessage description]
 * @param  {[type]} payload [description]
 * @return {[type]}         [description]
 */
const publishMessage = (payload) => {
  // Publisher
  amqpWrapper.CONNECTION.then(function (conn) {
    return conn.createChannel();
  })
    .then(function (ch) {
      return ch.assertQueue(amqpWrapper.QUEUE_NAME).then(function (ok) {
        ch.prefetch(10);
        return ch.sendToQueue(amqpWrapper.QUEUE_NAME, Buffer.from(payload));
      });
    })
    .catch((e) => {
      //linnworks.logger.error(e);
    });
};

module.exports = publishMessage;
