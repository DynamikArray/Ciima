/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
module.exports = fastify => ({
  drafts: async (req, res) => {
    let { status } = req.query;
    if (!status) status = "Open"; //default to open if no param

    const query = `SELECT * FROM slc_drafts WHERE status LIKE CONCAT("%",?,"%")`;

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      const [rows, fields] = await connection.query(query, [status]);
      connection.release();
      return { result: rows }; //result.rows;
    }

    return { error: "No Db Connection" };
  }
});
