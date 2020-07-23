const buildSelectQueries = (
  filterComicTypes = false,
  filterVariants = false,
  filterHasMatch = false
) => {
  const selectSQL = `SELECT i.Id AS id,
  	i.Title AS title,
  	i.IssueNum AS issueNumber,
  	i.ComicType AS comicType,
  	LPAD(i.IssueNum, 5, "0") as issueOrder,
  	i.Variation as variation,
  	i.Printing as printing,
  	i.FullIssue as fullIssue,
  	i.CoverDate as coverDate,
  	i.ImageUrl as imageUrl,
  	CASE WHEN m.id IS NULL then false ELSE true END as hasMatch,
  	m.issuePrices
  FROM slc_issues i
  LEFT JOIN mcs_issues m ON
	 m.slc_IssueId = i.Id
  `;

  const where = [];
  where.push("WHERE (");
  where.push("(i.Title = ?)");
  if (filterVariants)
    where.push('AND (i.Variation is NULL or i.Variation = "")');
  if (filterComicTypes)
    where.push('AND (i.comicType is NULL or i.comicType = "")');
  if (filterHasMatch) where.push("AND (m.id is NULL)");
  where.push(")");
  const whereSQL = where.join(" ");

  const orderSQL = `ORDER BY issueOrder LIMIT ? OFFSET ? `;
  const selectQuery = `${selectSQL} ${whereSQL} ${orderSQL}`;

  let totalQuery = `SELECT
    COUNT(*)as rowCount,
    CASE WHEN m.id IS NULL then false ELSE true END as hasMatch
    FROM slc_issues i
    LEFT JOIN mcs_issues m ON
     m.slc_IssueId = i.Id
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
