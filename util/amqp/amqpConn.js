//shared logging utilies
require("dotenv").config();
const AMQP = require("simple-amqplib");
const { EXCHANGE, QUEUE_NAME } = require("./config.js");

const config = {
  url: process.env.CLOUDAMQP_URL,
  exchange: EXCHANGE,
  queue: {
    name: QUEUE_NAME
  },
  // Set the QOS/prefetch (defaults to 1)
  prefetch: 100
};

const amqp = new AMQP(config);

module.exports = { amqp };

/* some routing options from simple-amqplib */

//routingKey: "routing_key" // If supplied, queue is bound to
// this key (or keys) on the exchange. NB Can be an array of strings or just  a string.
//options: {/* ... */} // Advanced: options passed to ch.assertQueue() in wrapped `amqplib`.
