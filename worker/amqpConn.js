//shared logging utilies
require("dotenv").config();
const AMQP = require("simple-amqplib");

var config = {
  url: process.env.CLOUDAMQP_URL,
  exchange: "drafts_exhange",
  queue: {
    name: "drafts"
    //routingKey: "routing_key" // If supplied, queue is bound to
    // this key (or keys) on the exchange. NB Can be an array of strings or just
    // a string.
    //options: {/* ... */} // Advanced: options passed to ch.assertQueue() in wrapped `amqplib`.
  },
  // Set the QOS/prefetch (defaults to 1)
  prefetch: 100
};

const amqp = new AMQP(config);
module.exports = { amqp };

/*
async function main() {
  // Must call this before you consume/publish/etc...
  await amqp.connect();

  // Consuming
  var handleMessage = function(message, callback) {
    //... Do things
    callback();
  };
  // You must call:
  callback(err, requeue);
  // in your handleMessage. If `err` !== `null` then the message will be `nack`ed.
  // Requeueing will be requeue iff `requeue` is `true`.
  // If `err` is `null` then the message is `ack`ed.
  // If an exception occurs in handleMessage, then the message is `nack`ed and not requeued.

  // Start consuming:
  amqp.consume(handleMessage);

  // Publishing to arbitrary routing key.
  await amqp.publish(routingKey, payload, options);
}
*/
