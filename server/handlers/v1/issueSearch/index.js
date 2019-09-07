module.exports = fastify => ({
  issueSearch: async (req, reply) => {
    const dbHelper = require("../../../util/dbHelper.js")(fastify);

    const query = `SELECT
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
        WHERE  i.TitleId = ${req.query.titleId}
        ORDER BY issueOrder`;

    const result = await dbHelper.query(query);

    //return query reponse
    if (result.rows) {
      return { result: result.rows }; //result.rows;
    }
    return result;
  }
});
