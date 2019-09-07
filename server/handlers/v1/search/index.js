module.exports = fastify => ({
  search: async (req, reply) => {
    const dbHelper = require("../../../util/dbHelper.js")(fastify);

    const query = `SELECT
          t.TitleID,
          t.Title,
          t.Publisher
          FROM slc_titles t
          WHERE  (t.Title LIKE '%${req.query.q}%') `;

    const result = await dbHelper.query(query);

    //return query reponse
    if (result.rows) {
      return result.rows;
    }
    return result;
  }
});
