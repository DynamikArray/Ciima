const buildSelectQueries = () => {
  const selectQuery = `SELECT * FROM slc_repricing_log ORDER BY ID DESC LIMIT ? OFFSET ?;`;

  const totalQuery = `SELECT COUNT(*)as rowCount FROM slc_repricing_log ORDER BY ID DESC;`;

  return { selectQuery, totalQuery };
};

const buildSelectQueriesParams = (page, pageLimit) => {
  const pageOffset = page * pageLimit;

  let selectParams = [pageLimit, pageOffset];
  let totalParams = [];

  return { selectParams, totalParams };
};

module.exports = { buildSelectQueries, buildSelectQueriesParams };
