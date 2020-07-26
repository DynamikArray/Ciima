module.exports = (fastify) => ({
  issueSearch: async (req, reply) => {
    const query = `
          SELECT
          @curRow := @curRow + 1 AS rowNumber,
          i.Id as id,
          Title as title,
          IssueNum as issueNumber,
          ComicType as comicType,
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
        JOIN (SELECT @curRow := 0) r
        LEFT JOIN mcs_issues mcs ON mcs.slc_IssueId = i.id
        WHERE i.Title = ?
        ORDER BY issueOrder`;

    const [rows, fields] = await fastify.mysql.query(query, [req.query.title]);

    return { result: rows };
  },
});
/* mcs.issuePrices as prices*/
/*LEFT JOIN mcs_issues mcs ON mcs.slc_IssueId = i.id */
