//list of queue actions we can use
const { SUBMIT_DRAFT } = require("../../../../util/amqp/queueActionsList.js");
const { QUEUE_NAME } = require("../../../../util/amqp/config.js");

module.exports = fastify => ({
  submitDraft: async (req, reply) => {
    const connection = await fastify.mysql.getConnection();

    if (connection) {
      const id = req.body.draftId;

      //// TODO: FILTER OUT DRAFTS BY STATUS
      //// NOT_LISTED, PENDING, LISTED
      const query = `SELECT * FROM slc_drafts WHERE id = ?`;
      const result = await connection.query(query);
      if (!result) connection.release();

      //if we have single row list it
      if (result.rows && result.rows.length == 1) {
        const channel = fastify.rabbit.channel;

        // Create queue if it does not exist
        const ok = await channel.assertQueue(QUEUE_NAME);
        // handle failed to assert queue
        if (!ok) {
          const error = `Unable to assert ${QUEUE_NAME}`;
          logger.error("error", error);
          return { error };
        }

        //create amqp action/data paylodd and convert objectt
        //to string so we can buffer
        const item = JSON.stringify({
          action: SUBMIT_DRAFT,
          data: result.rows[0]
        });

        // Push message to queue
        try {
          await channel.sendToQueue(QUEUE_NAME, Buffer.from(item));
          return { result: "Your draft has been submitted for listing." };
          //reply.send("Message sent!");
        } catch (err) {
          logger.error("error", err);
          return { error: "There was a problem submitting your listing" };
        }
      }

      return { result: rows };
    }

    return { error: "No DB Connection" };
  }
});
