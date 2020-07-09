/**
 * [buildAnalyticsQuery description]
 * @param  {number} days Number of days to search for
 * @return {object}      Object containg a {query: "sql string", params: ["array","of","param","values"]}
 */
const buildNewItemsQuery = (days, userId) => {
  const queryStart = `
        SELECT
          DATE_FORMAT(l.created_date, '%b %d, %Y') AS createdDate,
          u.username as username,
          l.action AS auditAction,
          count(l.resource_id) AS totalItems,
          round(sum(d.price),2) AS totalPrice,
          ROUND( sum(d.price) / count(l.resource_id),2 ) AS avgPrice
        FROM
          slc_audit_log l
        LEFT JOIN
          slc_users u
        ON l.user_id = u.id
        LEFT JOIN
          slc_drafts d
        ON
          l.resource_id = d.id
        WHERE
          (
          (l.action = 'CREATE_DRAFT')
          AND
          (l.created_date >= DATE_ADD(CURDATE(), INTERVAL '-?' DAY))
      `;

  let queryUserCondition = "";
  if (userId) {
    queryUserCondition = `
          AND
          (l.user_id LIKE CONCAT("%",'?',"%"))
          `;
  }

  const query =
    queryStart +
    queryUserCondition +
    `) GROUP BY
          username,
          DATE_FORMAT(l.created_date, '%b %d %Y'),
          auditAction
        ORDER BY
          DATE(l.created_date) asc
        `;

  const params = [days, userId];
  return { query, params };
};

module.exports = { buildNewItemsQuery };
