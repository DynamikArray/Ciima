//list of queue actions we can use
const { SUBMIT_DRAFT } = require("../../../../util/amqp/queueActionsList.js");

module.exports = (fastify) => ({
  submitDraft: async (req, reply) => {
    //pull off rabbit and winston to send to amqp helper
    const { rabbit, winston } = fastify;
    const amqp = require("../../../util/amqpMsgHelper.js")(rabbit, winston);

    //// TODO: FILTER OUT DRAFTS BY STATUS
    //// NOT_LISTED, PENDING, LISTED
    const id = req.body.draftId; //should be handled in schema validator

    //query
    const query = `SELECT * FROM slc_drafts WHERE id = ?`;
    const [rows, fields] = await fastify.mysql.query(query, [id]);

    //Handle no results
    if (rows.length == 0) {
      //no results
      fastify.winston.warn(`No draft with matching id of ${id} found`);
      return { result: `No draft with matching id of ${id} found` };
    } else {
      //we have draft we want to submit
      fastify.winston.info(`Draft ${id} submitting to worker`);

      //build our payload
      const payload = JSON.stringify({
        action: SUBMIT_DRAFT,
        data: rows[0],
      });

      //call our helper handles sending and repsonse
      const result = await amqp.sendMessage(payload);
      fastify.winston.debug(JSON.stringify(result));

      return result;
    }
  },
});
