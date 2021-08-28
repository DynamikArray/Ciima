const buildUserDraftsInputtedForWeekQuery = ({ userId, startDate, endDate }) => {
  const query = `
      SELECT
      	DATE_FORMAT(l.created_date, '%b %d, %Y') AS createdDate,
      	d.inventoryTitle,
      	d.locationCode,
      	d.quantity,
      	d.price,
      	d.draftType
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
      ORDER BY
      	DATE(l.created_date) ASC
  `;
  return { query };
};

module.exports = { buildUserDraftsInputtedForWeekQuery };
