const { PRICE_MATCH } = require("../auditLog/logResourceTypes");
const {
  CREATE_ISSUE_MATCH,
  UPDATE_ISSUE_MATCH,
  DELETE_ISSUE_MATCH,
} = require("../auditLog/logActionTypes");

const queryCreateIssueMatch = async (fastify, userId, params) => {
  //stringify our json fields
  params.issueTags = JSON.stringify(params.issueTags);
  params.issuePrices = JSON.stringify(params.issuePrices);

  const query = "INSERT INTO mcs_issues SET ?";
  let successResult,
    errorResult = false;

  try {
    const [rows, fields] = await fastify.mysql.query(query, params);
    const { affectedRows, insertId } = rows;
    successResult = rows;
    return { result: { affectedRows, insertId } };
  } catch (error) {
    errorResult = error;
    fastify.winston.error(error);
    return { error: error.message, result: false };
  } finally {
    if (!successResult) successResult = false;
    fastify.auditLogger.log(
      CREATE_ISSUE_MATCH,
      userId,
      successResult.insertId || 0,
      PRICE_MATCH,
      JSON.stringify({ successResult, errorResult })
    );
  }
};

const queryUpdateIssueMatch = async (fastify, userId, params) => {
  //stringify our json fields
  params.issueTags = JSON.stringify(params.issueTags);
  params.issuePrices = JSON.stringify(params.issuePrices);
  const { slc_IssueId } = params;

  const query = `UPDATE mcs_issues SET ? WHERE slc_IssueId=${slc_IssueId}`;

  let successResult,
    errorResult = false;
  try {
    const [rows, fields] = await fastify.mysql.query(query, params);
    const { affectedRows, insertId } = rows;
    successResult = rows;
    return { result: { affectedRows, insertId } };
  } catch (error) {
    errorResult = error;
    fastify.winston.error(error);
    return { error: error.message, result: false };
  } finally {
    fastify.auditLogger.log(
      UPDATE_ISSUE_MATCH,
      userId,
      successResult.insertId || 0,
      PRICE_MATCH,
      JSON.stringify({ successResult, errorResult })
    );
  }
};

const queryDeleteIssueMatch = async (fastify, userId, slc_IssueId) => {
  const query = `DELETE FROM mcs_issues WHERE slc_IssueId = ?`;

  let successResult,
    errorResult = false;
  try {
    const [rows, fields] = await fastify.mysql.query(query, slc_IssueId);
    const { affectedRows, insertId } = rows;
    successResult = rows;
    return { result: { affectedRows, insertId } };
  } catch (error) {
    errorResult = error;
    fastify.winston.error(error);
    return { error: error.message, result: false };
  } finally {
    fastify.auditLogger.log(
      DELETE_ISSUE_MATCH,
      userId,
      slc_IssueId || 0,
      PRICE_MATCH,
      JSON.stringify({ successResult, errorResult })
    );
  }
};

module.exports = {
  queryCreateIssueMatch,
  queryUpdateIssueMatch,
  queryDeleteIssueMatch,
};
