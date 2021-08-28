const buildDateWhereClause = (startDate, endDate) => {
  if (!startDate && !endDate) {
    return "";
  } else {
    return `AND (l.created_date BETWEEN '${startDate}' AND '${endDate}' )`;
  }
};

const buildWeeklyTotalsQuery = (startDate = false, endDate = false) => {
  const query = `SELECT
    YEARWEEK( DATE_FORMAT(l.created_date, '%Y-%m-%d'), 0 ) AS calendarWeek,
    DATE_FORMAT(adddate(MIN(l.created_date), INTERVAL 1-DAYOFWEEK(MIN(l.created_date)) DAY),'%Y-%m-%d') weekStart,
	  DATE_FORMAT(adddate(MIN(l.created_date), INTERVAL 7-DAYOFWEEK(MIN(l.created_date)) DAY),'%Y-%m-%d') weekEnd,
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
      ${buildDateWhereClause(startDate, endDate)}
    )
  GROUP BY
    calendarWeek
  ORDER BY
    calendarWeek`;
  return { query };
};

module.exports = { buildWeeklyTotalsQuery };
