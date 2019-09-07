module.exports = fastify => ({
  titleSearch: async (req, reply) => {
    const dbHelper = require("../../../util/dbHelper.js")(fastify);

    const query = `SELECT
          Count(i.Title) as issuesCount,
          t.Title as title,
          t.TitleId as titleId,
          t.Publisher as publisher,
          t.YearsPublished as yearsPublished
        FROM
          slc_titles t,
          slc_issues i
        WHERE(
          (t.Title LIKE '%${req.query.q}%')
          AND
          (t.TitleId = i.TitleId)
        )
        GROUP BY
          i.Title,
          t.Title,
          t.TitleId,
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
