const getInventoryItemAuditTrail = (pkStockItemId) => {
  const sqlQuery = `SELECT
			u.displayname as userName,
			a.resource_type as resourceType,
			a.action as resourceAction,
      CAST(a.meta AS CHAR) as resourceMeta,
			a.created_date
		FROM
			slc_audit_log a
		LEFT JOIN slc_users u ON a.user_id = u.id
		WHERE
			(
				a.resource_id = '${pkStockItemId}'
				OR
				a.resource_id =  (SELECT d.id FROM slc_drafts d WHERE d.stockItemId = '${pkStockItemId}')
			)
		ORDER BY a.created_date DESC
  `;

  return sqlQuery;
};

module.exports = getInventoryItemAuditTrail;
