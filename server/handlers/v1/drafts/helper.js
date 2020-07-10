const buildSelectQueries = () => {
  const selectQuery = `
      SELECT
        d.*,
        u.displayname as ownerName
      FROM slc_drafts d
      LEFT JOIN slc_users u ON d.ownerId = u.id
      WHERE (
        (inventoryTitle LIKE CONCAT("%",?,"%"))
        AND
        (status LIKE CONCAT("%",?,"%"))
        AND
        (draftType LIKE CONCAT("%",?,"%"))
      )
      ORDER BY d.createdDate DESC
      LIMIT ? OFFSET ?`;

  let totalQuery = `
    SELECT
      COUNT(*)as rowCount
    FROM slc_drafts d
    LEFT JOIN slc_users u ON d.ownerId = u.id
    WHERE (
      (inventoryTitle LIKE CONCAT("%",?,"%"))
      AND
      (status LIKE CONCAT("%",?,"%"))
      AND
      (draftType LIKE CONCAT("%",?,"%"))
    )
    ORDER BY d.createdDate DESC `;

  return { selectQuery, totalQuery };
};

const buildSelectQueriesParams = (
  page,
  pageLimit,
  status,
  draftType,
  searchString
) => {
  const pageOffset = page * pageLimit;
  //default most recent
  let selectParams = [searchString, status, draftType, pageLimit, pageOffset];
  let totalParams = [searchString, status, draftType];

  return { selectParams, totalParams };
};

module.exports = { buildSelectQueries, buildSelectQueriesParams };
