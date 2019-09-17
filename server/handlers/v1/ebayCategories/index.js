module.exports = fastify => ({
  ebayCategories: async (req, reply) => {
    const query = `SELECT
        id,
        ebayCategoryId,
        ebayCategoryName
        FROM
          slc_ebay_site_categories c
        WHERE (c.ebayCategoryName LIKE concat('%',?,'%') )
        ORDER BY ebayCategoryName ASC`;

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      const [rows, fields] = await connection.query(query, [req.query.q]);
      connection.release();
      return { result: rows };
    }
    return { error: "No db connection" };
  }
});
