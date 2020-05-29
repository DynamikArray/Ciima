const buildSelectQueries = () => {
  const selectQuery = `
      SELECT
        a.*,
        u.username
      FROM slc_audit_log a
      LEFT JOIN slc_users u ON u.id = a.user_id
      WHERE (
        (resource_type LIKE CONCAT("%",?,"%"))
        AND
        (action LIKE CONCAT("%",?,"%"))
        AND
        (user_id LIKE CONCAT("%",?,"%"))
      )
      ORDER BY a.id DESC
      LIMIT ? OFFSET ?`;

  let totalQuery = `
    SELECT
      COUNT(*)as rowCount
    FROM slc_audit_log a
    LEFT JOIN slc_users u ON u.id = a.user_id
    WHERE (
      (resource_type LIKE CONCAT("%",?,"%"))
      AND
      (action LIKE CONCAT("%",?,"%"))
      AND
      (user_id LIKE CONCAT("%",?,"%"))
    )
    ORDER BY a.id DESC`;

  return { selectQuery, totalQuery };
};

const buildSelectQueriesParams = (
  page,
  pageLimit,
  resourceType,
  actionType,
  userId
  //status,
  //draftType,
  //searchString
) => {
  const pageOffset = page * pageLimit;
  //default most recent
  //let selectParams = [searchString, status, draftType, pageLimit, pageOffset];
  //let totalParams = [searchString, status, draftType];
  let selectParams = [resourceType, actionType, userId, pageLimit, pageOffset];
  let totalParams = [resourceType, actionType, userId];

  return { selectParams, totalParams };
};

module.exports = { buildSelectQueries, buildSelectQueriesParams };
