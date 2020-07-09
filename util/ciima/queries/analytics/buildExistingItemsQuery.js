const buildExistingItemsQuery = (days, userId) => {
  const queryStart = `
    SELECT
    	stats.createdDate,
    	stats.username,
    	stats.auditAction,
    	COUNT(stats.price) AS totalItems,
    	ROUND(SUM(stats.price),2) AS totalPrice,
    	ROUND ( SUM(stats.price) / COUNT(stats.price),2  ) AS avgPrice
    FROM
    	(SELECT
    		DATE_FORMAT(l.created_date, '%b %d, %Y') AS createdDate,
    		u.username,
    		l.action AS auditAction,
    		sum(d.price) AS price
    	FROM
    		slc_audit_log l
    	LEFT JOIN
    		slc_users u
    	ON l.user_id = u.id
    	LEFT JOIN
    		slc_drafts d
    	ON
    		l.resource_id = d.stockItemId
    	WHERE
    	(
    		(l.action = 'UPDATE_LOCATION_FIELD')
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
    `)
    	GROUP BY
    		d.stockItemId,
    		u.username,
    		DATE(l.created_date)
    	ORDER BY
    		DATE(l.created_date) DESC
    	) stats
    GROUP BY
    	stats.createdDate,
    	stats.username
    ORDER BY
    	stats.createdDate	Asc
    `;

  const params = [days, userId];
  return { query, params };
};
module.exports = { buildExistingItemsQuery };
