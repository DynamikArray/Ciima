const buildWeeklyTotalsQuery = () => {
  const query = `SELECT
    YEARWEEK( DATE_FORMAT(l.created_date, '%Y-%m-%d'), 0 ) AS calendarWeek,
    MIN(DATE_FORMAT(l.created_date, '%Y-%m-%d')) AS weekStart,
    MAX(DATE_FORMAT(l.created_date, '%Y-%m-%d')) AS weekEnd,
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
    )
  GROUP BY
    calendarWeek
  ORDER BY
    calendarWeek`;

  const params = [];
  return { query, params };
};

module.exports = { buildWeeklyTotalsQuery };
