//// TODO: Handle strange single quote charachters in the datbase
////
////  MUCH FASTER LESS ACCURATE
////  MATCH (storylines) against (? IN NATURAL LANGUAGE MODE)
////
const buildAdvanced = (search, alpha) => {
  const query = `SELECT
        COUNT(i.Title)as issueCount,
        t.Title as title,
        t.TitleId as titleId,
        t.Publisher as publisher,
        t.YearsPublished as yearsPublished
      FROM
        slc_issues i,
        slc_titles t
      WHERE
      (
        MATCH (storylines) against (? IN NATURAL LANGUAGE MODE)
      AND
        (t.Title = i.Title)
      )
      GROUP BY t.title, t.titleId, t.publisher, t.yearsPublished
      ORDER BY issueCount DESC, t.title ASC
      LIMIT 250`;

  const params = [search];
  return { query, params };
};

const buildSearch = (search, alpha) => {
  const query = `SELECT
        COUNT(i.Title)as issueCount,
        t.Title as title,
        t.TitleId as titleId,
        t.Publisher as publisher,
        t.YearsPublished as yearsPublished
      FROM
        slc_titles t,
        slc_issues i
      WHERE
      (
        ( t.Title LIKE concat('%',?,'%')  OR  t.AlphabetizedTitle LIKE concat('%',?,'%') )
      AND
        (t.Title = i.Title)
      )
      GROUP BY t.title, t.titleId, t.publisher, t.yearsPublished
      ORDER BY issueCount DESC, t.title ASC
      LIMIT 250`;

  const params = [search, alpha];
  return { query, params };
};

module.exports = fastify => ({
  titleSearch: async (req, reply) => {
    //removes all extra chars from search string
    const searchString = req.query.query;
    const alphaTitle = searchString.replace(/[^a-z0-9+]+/gi, "");

    //check if advaned or standard
    const isAdvanced = req.query.advanced;

    let sqlOpts = {};
    if (isAdvanced) sqlOpts = buildAdvanced(searchString, alphaTitle);
    if (!isAdvanced) sqlOpts = buildSearch(searchString, alphaTitle);

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      const [rows, fields] = await connection.query(
        sqlOpts.query,
        sqlOpts.params
      );
      connection.release();
      return { result: rows };
    }
    return { error: "No Connection" };
  }
});
