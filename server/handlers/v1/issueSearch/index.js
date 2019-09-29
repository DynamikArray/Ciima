module.exports = fastify => ({
  issueSearch: async (req, reply) => {
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
        WHERE i.Title = ?
        ORDER BY issueOrder`;

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      const [rows, fields] = await connection.query(query, [req.query.title]);
      connection.release();
      return { result: rows };
    }
    return { error: "No db connection" };
  }
});
