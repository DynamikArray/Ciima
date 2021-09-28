const buildSelectQueries = () => {
  const selectQuery = `SELECT id, itemTitle, newPrice, oldPrice, pkStockItemID, CONVERT_TZ(dateUpdated,'+00:00','-04:00')as dateUpdated FROM slc_repricing_log ORDER BY ID DESC LIMIT ? OFFSET ?;`;

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
