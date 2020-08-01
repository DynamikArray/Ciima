//// TODO: Handle strange single quote charachters in the datbase
////
////  MUCH FASTER LESS ACCURATE
////  MATCH (storylines) against (? IN NATURAL LANGUAGE MODE)
////
/*
const buildAdvanced = (search, alpha) => {
  const query = `SELECT
        COUNT(i.Title)as issueCount,
        COUNT(mcs.slc_IssueId) as matchedCount,
        t.Title as title,
        t.TitleId as titleId,
        t.Publisher as publisher,
        t.YearsPublished as yearsPublished
      FROM
        slc_issues i,
        slc_titles t
      LEFT JOIN mcs_issues mcs ON i.Id = mcs.slc_IssueId
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
*/

const buildSearch = (search, alpha, display, publisher = "") => {
  const query = `SELECT
        COUNT(i.Title)as issueCount,
        COUNT(mcs.slc_IssueId) as matchedCount,
        t.Title as title,
        t.TitleId as titleId,
        t.Publisher as publisher,
        t.YearsPublished as yearsPublished
      FROM
        slc_titles t,
        slc_issues i
      LEFT JOIN mcs_issues mcs ON i.Id = mcs.slc_IssueId
      WHERE
      (
        (
          t.Title LIKE concat('%',?,'%')
          OR
          t.AlphabetizedTitle LIKE concat('%',?,'%')
          OR
          t.DisplayTitle LIKE concat('%',?,'%')
        )
      AND
        (t.Title = i.Title)
      AND
        ( t.Publisher LIKE CONCAT('%',?,'%') )
      )
      GROUP BY t.title, t.titleId, t.publisher, t.yearsPublished
      ORDER BY issueCount DESC, t.title ASC
      LIMIT 1000`;

  const params = [search, alpha, display, publisher];
  return { query, params };
};

const buildUpcTitle = (search) => {
  const query = `SELECT
        COUNT(i.Title)as issueCount,
        t.Title as title,
        t.TitleId as titleId,
        t.Publisher as publisher,
        t.YearsPublished as yearsPublished,
        'test' as matched
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
      LIMIT 1000`;

  const params = [search];
  return { query, params };
};

const buildUpcIssue = (search) => {
  const query = `
        SELECT
        @curRow := @curRow + 1 AS rowNumber,
        i.Id as id,
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
        eBayCat2 as eBayCat2,
        mcs.issuePrices as issuePrices
      FROM slc_issues i
      JOIN    (SELECT @curRow := 0) r
      LEFT JOIN mcs_issues mcs ON mcs.slc_IssueId = i.id
      WHERE i.UPC = ?
      ORDER BY issueOrder`;

  const params = [search];
  return { query, params };
};

module.exports = (fastify) => ({
  titleSearch: async (req, reply) => {
    //removes all extra chars from search string
    const searchString = req.query.query;
    const alphaTitle = searchString.replace(/[^a-z0-9+]+/gi, "");
    const displayTitle = req.query.query;

    const publisher = req.query.publisher;
    //check if advaned or standard
    //const isAdvanced = req.query.advanced;

    let sqlOpts = {};
    //if (isAdvanced) sqlOpts = buildAdvanced(searchString, alphaTitle);
    //if (!isAdvanced)
    sqlOpts = buildSearch(searchString, alphaTitle, displayTitle, publisher);

    const [rows, fields] = await fastify.mysql.query(
      sqlOpts.query,
      sqlOpts.params
    );

    return { result: rows };
  },

  upcSearch: async (req, reply) => {
    try {
      const upc = req.query.query;

      upcTitleSqlOpts = buildUpcTitle(upc);
      upcIssueeSqlOpts = buildUpcIssue(upc);

      const [titleResults] = await fastify.mysql.query(
        upcTitleSqlOpts.query,
        upcTitleSqlOpts.params
      );

      const [issueResults] = await fastify.mysql.query(
        upcIssueeSqlOpts.query,
        upcIssueeSqlOpts.params
      );

      const title = titleResults[0];
      const issue = issueResults[0];

      return { result: { title, issue } };
    } catch (e) {
      console.log(e);
    }
  },
});
