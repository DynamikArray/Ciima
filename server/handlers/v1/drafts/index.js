/**
 * @param {FastifyObject} request
 */

/**
 * [exports description]
 * @param  {FastifyObject} fastify the fastify isntance
 * @return {object}         object containing the apporiate handlers for the drafts route
 */
module.exports = fastify => ({
  readHandler: async (req, res) => {
    let { status, all } = req.query;
    if (!status) status = "Open"; //default to open if no param

    //users record by status
    let query = `SELECT
        d.*,
        u.username as ownerName
      FROM slc_drafts d
      LEFT JOIN slc_users u ON d.ownerId = u.id
      WHERE (status LIKE CONCAT("%",?,"%") AND (d.ownerId = ${req.user.id}))
      ORDER BY d.id DESC `;

    if (all) {
      //all records by status
      query = `SELECT
          d.*,
          u.username as ownerName
        FROM slc_drafts d
        LEFT JOIN slc_users u ON d.ownerId = u.id
        WHERE status LIKE CONCAT("%",?,"%")
        ORDER BY d.id DESC `;
    }

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      const [rows, fields] = await connection.query(query, [status]);
      connection.release();
      return { result: rows }; //result.rows;
    }

    return { error: "No Db Connection" };
  }
});
