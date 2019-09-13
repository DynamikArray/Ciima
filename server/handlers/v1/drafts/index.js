/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
module.exports = fastify => ({
  drafts: async (req, res) => {
    const draft = req.body;
    const dbHelper = require("../../../util/dbHelper.js")(fastify);

    const query = `SELECT * FROM slc_drafts order by id DESC`;

    const result = await dbHelper.query(query);

    //return query reponse
    if (result.rows) {
      return { result: result.rows }; //result.rows;
    }
    return result;
  }
});
