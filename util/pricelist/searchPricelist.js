const buildSelectQueries = (dateCreated, dateUpdated) => {
  const selectSQL = `SELECT
  	mcs.slc_IssueId AS ourIssueId,
  	slc.imageUrl AS ourImageUrl,
  	CONCAT(slc.Title," #",slc.FullIssue) AS ourTitle,
  	slc.FullIssue AS ourFullIssue,
  	mcs.issueTitle AS theirTitle,
  	mcs.issueThumbnail AS theirImageThumbnail,
  	mcs.issueFullsize AS theirImageFullsize,
  	mcs.issuePrices AS ourPricesFromThem,
  	slc.CoverDate AS issueCoverDate,
  	mcs.issueTags AS theirIssueTags,
  	mcs.dateCreated AS dateCreated,
  	mcs.dateUpdated AS dateUpdated
  FROM
  	mcs_issues mcs
  LEFT JOIN
  	slc_issues slc ON  slc.id = mcs.slc_IssueId`;

  const where = [];
  where.push("WHERE (");
  where.push("slc.Title LIKE CONCAT('%',?,'%')");

  if (dateCreated) {
    where.push("AND");
    where.push(`DATE(mcs.dateCreated) = "${dateCreated}"`);
  }

  if (dateUpdated) {
    where.push("AND");
    where.push(`DATE(mcs.dateUpdated) = "${dateUpdated}"`);
  }

  where.push(")");
  const whereSQL = where.join(" ");

  const orderSQL = `ORDER BY dateUpdated DESC LIMIT ? OFFSET ? `;
  const selectQuery = `${selectSQL} ${whereSQL} ${orderSQL}`;

  let totalQuery = `SELECT
    COUNT(*)as rowCount
    FROM
    	mcs_issues mcs
    LEFT JOIN
    	slc_issues slc ON  slc.id = mcs.slc_IssueId
    ${whereSQL}`;

  return { selectQuery, totalQuery };
};

const buildSelectQueriesParams = (page, pageLimit, searchString) => {
  const pageOffset = page * pageLimit;
  //default most recent
  let selectParams = [searchString, pageLimit, pageOffset];
  let totalParams = [searchString];

  return { selectParams, totalParams };
};

module.exports = { buildSelectQueries, buildSelectQueriesParams };
