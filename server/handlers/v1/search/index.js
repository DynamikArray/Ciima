module.exports = fastify => ({
  search: async (req, reply) => {
    const dbHelper = require("../../../util/dbHelper.js")(fastify);

    const query = `SELECT
          Count(i.Title) as IssuesCount,
          t.Title,
          t.TitleID,
          t.Publisher,
          t.YearsPublished
        FROM
          slc_titles t,
          slc_issues i
        WHERE(
          (t.Title LIKE '%${req.query.q}%')
          AND
          (t.TitleID = i.TitleID)
        )
        GROUP BY
          i.Title,
          t.Title,
          t.TitleID,
          t.Publisher,
          t.YearsPublished
        LIMIT 200`;

    const result = await dbHelper.query(query);

    //return query reponse
    if (result.rows) {
      return { result: result.rows }; //result.rows;
    }
    return result;
  }
});
