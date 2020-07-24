const buildReadPricelistQuery = (slc_IssueId) => {
  const strSQL = `SELECT
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
  	slc_issues slc ON  slc.id = mcs.slc_IssueId
  WHERE
    mcs.slc_IssueId = ?`;

  return strSQL;
};
module.exports = { buildReadPricelistQuery };
