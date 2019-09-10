module.exports = fastify => ({
  titleSearch: async (req, reply) => {
    const dbHelper = require("../../../util/dbHelper.js")(fastify);

    const query = `SELECT
          COUNT(i.Title)as issueCount,
          t.Title as title,
          t.TitleId as titleId,
          t.Publisher as publisher,
          t.YearsPublished as yearsPublished
        FROM
          slc_issues i,
          slc_titles t
        WHERE (t.Title LIKE '%${req.query.q}%') AND (t.Title = i.Title)
        GROUP BY t.title, t.titleId, t.publisher, t.yearsPublished
        ORDER BY t.title ASC`;

    const result = await dbHelper.query(query);

    //return query reponse
    if (result.rows) {
      return { result: result.rows }; //result.rows;
    }
    return result;
  }
});
