module.exports = (fastify) => ({
  ebayCategories: async (req, reply) => {
    const query = `SELECT
        id,
        ebayCategoryId,
        ebayCategoryName
        FROM
          slc_ebay_site_categories c
        WHERE (c.ebayCategoryName LIKE concat('%',?,'%') )
        ORDER BY ebayCategoryName ASC`;

    const [rows, fields] = await fastify.mysql.query(query, [req.query.q]);

    return { result: rows };
  },
});
