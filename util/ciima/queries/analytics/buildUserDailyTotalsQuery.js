const buildUserDailyTotalsQuery = ({ userId, targetValue, startDate, endDate }) => {
  const query = `
    SELECT
    	DATE_FORMAT(l.created_date, '%b %d, %Y') AS createdDate,
    	count(l.resource_id) AS totalItems,
    	round(sum(d.price),2) AS totalPrice,
    	ROUND( sum(d.price) / count(l.resource_id),2 ) AS avgPrice,
      ROUND(sum(d.price) / ${targetValue}, 2) * 100  AS percentOfTarget
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
	      (l.created_date BETWEEN '${startDate}' AND '${endDate}' )
        AND
        (l.user_id = ${userId})
    	)
    GROUP BY
    	DATE_FORMAT(l.created_date, '%b %d %Y')
    ORDER BY
    	DATE(l.created_date) ASC
  `;
  return { query };
};

module.exports = { buildUserDailyTotalsQuery };
