const buildSelectQueries = () => {
  const selectQuery = `
      SELECT
        d.*,
        u.username as ownerName
      FROM slc_drafts d
      LEFT JOIN slc_users u ON d.ownerId = u.id
      WHERE status LIKE CONCAT("%",?,"%")
      ORDER BY d.createdDate DESC
      LIMIT ? OFFSET ?`;

  let totalQuery = `
    SELECT
      COUNT(*)as rowCount
    FROM slc_drafts d
    LEFT JOIN slc_users u ON d.ownerId = u.id
    WHERE status LIKE CONCAT("%",?,"%")
    ORDER BY d.createdDate DESC `;

  return { selectQuery, totalQuery };
};

const buildSelectQueriesParams = (page, pageLimit, status) => {
  const pageOffset = page * pageLimit;
  //default most recent
  let selectParams = [status, pageLimit, pageOffset];
  let totalParams = [status];

  return { selectParams, totalParams };
};

module.exports = { buildSelectQueries, buildSelectQueriesParams };
