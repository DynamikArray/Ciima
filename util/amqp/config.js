const env = process.env.NODE_ENV || "development";

let exchange = "ciima";
let queueName = "ciima";

//add the prod extension when in production
if (env === "production") {
  exchange = `${exchange}.PROD`;
  queueName = `${queueName}.PROD`;
} else {
  exchange = `${exchange}.DEV`;
  queueName = `${queueName}.DEV`;
}

module.exports = { EXCHANGE: exchange, QUEUE_NAME: queueName };
