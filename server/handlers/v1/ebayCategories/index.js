module.exports = fastify => ({
  ebayCategories: async (req, reply) => {
    const dbHelper = require("../../../../util/mysql/fastifyMysqlConn.js")(
      fastify
    );

    const query = `SELECT
        id,
        ebayCategoryId,
        ebayCategoryName
        FROM
          slc_ebay_site_categories c
        WHERE (c.ebayCategoryName LIKE '%${req.query.q}%')
        ORDER BY ebayCategoryName ASC`;

    const result = await dbHelper.query(query);

    //return query reponse
    if (result.rows) {
      return { result: result.rows }; //result.rows;
    }
    return result;
  }
});
