//// TODO: Handle strange single quote charachters in the datbase

module.exports = fastify => ({
  titleSearch: async (req, reply) => {
    const dbHelper = require("../../../../util/mysql/fastifyMysqlConn.js")(
      fastify
    );

    const query = `SELECT
          COUNT(i.Title)as issueCount,
          t.Title as title,
          t.TitleId as titleId,
          t.Publisher as publisher,
          t.YearsPublished as yearsPublished
        FROM
          slc_issues i,
          slc_titles t
        WHERE ( (t.Title LIKE concat('%',?,'%') OR t.AlphabetizedTitle LIKE concat('%',?,'%')   )) AND (t.Title = i.Title)
        GROUP BY t.title, t.titleId, t.publisher, t.yearsPublished
        ORDER BY t.title ASC
        LIMIT 250`;

    //removes all extra chars from search string
    const alphaTitle = req.query.q.replace(/[^a-z0-9+]+/gi, "");
    //run placeholder query
    const result = await dbHelper.query(query, [req.query.q, cleanTitle]);

    //return query reponse
    if (result.rows) {
      return { result: result.rows }; //result.rows;
    }
    return result;
  }
});
