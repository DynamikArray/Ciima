const buildSelectQueries = () => {
  const selectQuery = `
      SELECT
        d.*,
        u.displayname as ownerName
      FROM slc_drafts d
      LEFT JOIN slc_users u ON d.ownerId = u.id
      WHERE (
        (
          (inventoryTitle LIKE CONCAT("%",?,"%"))
          OR
          (locationCode LIKE CONCAT("%",?,"%"))
        )
        AND
        (status LIKE CONCAT("%",?,"%"))
        AND
        (draftType LIKE CONCAT("%",?,"%"))
        AND
        (CAST(DATE(d.createdDate)AS CHAR) LIKE CONCAT("%",?,"%"))
      )
      ORDER BY d.createdDate DESC
      LIMIT ? OFFSET ?`;

  let totalQuery = `
    SELECT
      COUNT(*)as rowCount
    FROM slc_drafts d
    LEFT JOIN slc_users u ON d.ownerId = u.id
    WHERE (
      (
        (inventoryTitle LIKE CONCAT("%",?,"%"))
        OR
        (locationCode LIKE CONCAT("%",?,"%"))
      )
      AND
      (status LIKE CONCAT("%",?,"%"))
      AND
      (draftType LIKE CONCAT("%",?,"%"))
      AND
      (CAST(DATE(d.createdDate)AS CHAR) LIKE CONCAT("%",?,"%"))
    )
    ORDER BY d.createdDate DESC `;

  return { selectQuery, totalQuery };
};

const buildSelectQueriesParams = (
  page,
  pageLimit,
  status,
  draftType,
  titleString,
  locationString,
  createdDate
) => {
  const pageOffset = page * pageLimit;
  //default most recent
  let selectParams = [
    titleString,
    locationString,
    status,
    draftType,
    createdDate,
    pageLimit,
    pageOffset,
  ];
  let totalParams = [
    titleString,
    locationString,
    status,
    draftType,
    createdDate,
  ];

  return { selectParams, totalParams };
};

module.exports = { buildSelectQueries, buildSelectQueriesParams };
