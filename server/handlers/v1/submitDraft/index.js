//list of queue actions we can use
const { SUBMIT_DRAFT } = require("../../../../shared/queueActionsList.js");

module.exports = fastify => ({
  submitDraft: async (req, reply) => {
    const dbHelper = require("../../../util/dbHelper.js")(fastify);
    const id = req.body.draftId;

    //// TODO: FILTER OUT DRAFTS BY STATUS
    //// NOT_LISTED, PENDING, LISTED
    const query = `SELECT * FROM slc_drafts WHERE id = ?`;
    const result = await dbHelper.query(query, [id]);

    //console.log("THIS DRAFT NEEDS TO BE SENT TO LINNWORKS", result);
    //if we have single row list it
    if (result.rows && result.rows.length == 1) {
      const channel = fastify.rabbit.channel;

      // Create queue if it does not exist
      const ok = await channel.assertQueue("drafts");
      // handle failed to assert queue
      if (!ok) {
        logger.error("unable to assert queue drafts");
      }
      //create amqp action/data paylodd and convert objectt
      //to string so we can buffer
      const item = JSON.stringify({
        action: SUBMIT_DRAFT,
        data: result.rows[0]
      });

      // Push message to queue
      try {
        await channel.sendToQueue("drafts", Buffer.from(item));
        return { result: "Your draft has been submitted for listing." };
        //reply.send("Message sent!");
      } catch (err) {
        logger.error(err);
        fastify.log.error(err);
        return { error: "There was a problem submitting your listing" };
      }
    }
    //Unexpected repsonse return
    return result;
  }
});
