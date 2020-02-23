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
      LIMIT 500`;

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
      LIMIT 500`;

  const params = [search, alpha];
  return { query, params };
};

const buildUpcTitle = search => {
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
        ( i.UPC = ? )
      AND
        (t.Title = i.Title)
      )
      GROUP BY t.title, t.titleId, t.publisher, t.yearsPublished
      ORDER BY issueCount DESC, t.title ASC
      LIMIT 500`;

  const params = [search];
  return { query, params };
};

const buildUpcIssue = search => {
  const query = `
        SELECT
        @curRow := @curRow + 1 AS rowNumber,
        Id as id,
        Title as title,
        IssueNum as issueNumber,
        LPAD(IssueNum, 5, "0") as issueOrder,
        Variation as variation,
        Printing as printing,
        FullIssue as fullIssue,
        Notes as notes,
        NotesText as notesText,
        Storylines as storylines,
        CoverDate as coverDate,
        Writer as writer,
        Artist as artist,
        CoverArtist as coverArtist,
        Appearances as appearances,
        UPC as upc,
        ImageUrl as imageUrl,
        eBayCat1 as eBayCat1,
        eBayCat2 as eBayCat2
      FROM slc_issues i
      JOIN    (SELECT @curRow := 0) r
      WHERE i.UPC = ?
      ORDER BY issueOrder`;

  const params = [search];
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
  },

  upcSearch: async (req, reply) => {
    try {
      const upc = req.query.query;

      upcTitleSqlOpts = buildUpcTitle(upc);
      upcIssueeSqlOpts = buildUpcIssue(upc);

      const connection = await fastify.mysql.getConnection();
      if (connection) {
        const [titleResults] = await connection.query(
          upcTitleSqlOpts.query,
          upcTitleSqlOpts.params
        );

        const [issueResults] = await connection.query(
          upcIssueeSqlOpts.query,
          upcIssueeSqlOpts.params
        );
        connection.release();

        const title = titleResults[0];
        const issue = issueResults[0];

        return { result: { title, issue } };
      }

      return { error: "No Connection" };
    } catch (e) {
      console.log(e);
    }
  }
});
