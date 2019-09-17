//
const { QUEUE_NAME } = require("../../util/amqp/config.js");

/**
 * Amqp message handler - handles sending messages on the instance
 * @param  {object} rabbit Rabbit instance attached to fastify
 * @param  {object} logger Logger instance attached to fastify
 * @return {object}        Return object {result/error :  string response }
 */

module.exports = (rabbit, logger) => ({
  sendMessage: async payload => {
    //open channel
    const channel = rabbit.channel;

    // Create queue if it does not exist
    const ok = await channel.assertQueue(QUEUE_NAME);
    // handle failed to assert queue
    if (!ok) {
      const error = `Unable to assert ${QUEUE_NAME}`;
      //log error and return full error string for
      //// TODO: refine this error message
      logger.error(error);
      return { error };
    }

    // Push message to queue
    try {
      logger.debug(`${QUEUE_NAME} Payload: ${JSON.stringify(payload)}`);
      const result = await channel.sendToQueue(
        QUEUE_NAME,
        Buffer.from(payload)
      );
      return { result: "Your draft has been submitted for listing." };
    } catch (err) {
      logger.error(err);
      return { error: "There was a problem submitting your listing" };
    }
  }
});
