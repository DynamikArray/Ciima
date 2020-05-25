require("dotenv").config();
const CONNECTION = require("amqplib").connect(process.env.CLOUDAMQP_URL);
const { EXCHANGE, QUEUE_NAME } = require("./config.js");

module.exports = { CONNECTION, EXCHANGE, QUEUE_NAME };
