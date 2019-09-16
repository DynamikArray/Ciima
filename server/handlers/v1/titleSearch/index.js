module.exports = fastify => ({
  titleSearch: async (req, reply) => {
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

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      const [rows, fields] = await connection.query(query);
      connection.release();
      return { result: rows };
    }
  }
});
