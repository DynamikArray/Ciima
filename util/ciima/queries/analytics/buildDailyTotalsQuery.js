const buildDailyTotalsQuery = () => {
  const query = `
    SELECT
    	DATE_FORMAT(l.created_date, '%b %d, %Y') AS createdDate,
    	count(l.resource_id) AS totalItems,
    	round(sum(d.price),2) AS totalPrice,
    	ROUND( sum(d.price) / count(l.resource_id),2 ) AS avgPrice
    FROM
    	slc_audit_log l
    LEFT JOIN
       slc_drafts d
    ON
    	l.resource_id = d.id
    WHERE
    	(
    		(l.action = 'CREATE_DRAFT' OR l.action = 'UPDATE_LOCATION_FIELD')
    		AND
    		(l.created_date >= DATE_ADD(CURDATE(), INTERVAL '-14' DAY))
    	)
    GROUP BY
    	DATE_FORMAT(l.created_date, '%b %d %Y')
    ORDER BY
    	DATE(l.created_date) ASC
  `;

  const params = [];
  return { query, params };
};

module.exports = { buildDailyTotalsQuery };
