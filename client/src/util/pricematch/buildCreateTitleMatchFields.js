const buildCreateTitleMatchFields = (ourIssue, theirIssue, theirTitle) => {
  const params = {
    slc_IssueId: false,
    mcs_TID: false,
    issueUniqueId: false,
    issueNumber: false,
    issueTitle: false,
    issuePrices: [],
    issueTags: [],
    issuePublisher: false,
    issueDate: false,
    issueThumbnail: false,
    issueFullsize: false
  };

  params.slc_IssueId = ourIssue.id;
  params.mcs_TID = theirTitle.titleId;
  params.issueUniqueId = `${
    theirTitle.titleId
  }-${theirIssue.issueNumber.replace("#", "")}`;

  params.issueNumber = `${theirIssue.issueNumber.replace("#", "")}`;
  params.issueTitle = `${theirIssue.title} ${theirIssue.issueNumber}`;
  params.issuePrices = theirIssue.prices;
  params.issueTags = theirIssue.tags;
  params.issuePublisher = theirIssue.publisher;
  params.issueDate = theirIssue.year;
  params.issueThumbnail = theirIssue.images.thumbnail;
  params.issueFullsize = theirIssue.images.fullsize;

  return params;
};

module.exports = { buildCreateTitleMatchFields };
