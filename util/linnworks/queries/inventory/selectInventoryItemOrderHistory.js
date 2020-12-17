const selectInventoryItemOrderHistory = (pkStockItemID) => {
  const sqlQuery = `script=SELECT
      o.cFullName,
      o.cEmailAddress,
      o.cShippingAddress,
      o.cPostCode,
      o.dReceievedDate,
      o.dProcessedOn,
      o.nOrderId,
      o.Source,
      o.ReferenceNum,
      o.ExternalReference,
      o.PostalTrackingNumber,
      o.Address1,
      o.Address2,
      o.Town,
      o.Region,
      o.BuyerPhoneNumber,
      o.SubTotal,
      o.PostageCostExTax
  FROM
      StockItem si,
      OrderItem oi,
      [Order] o
  WHERE
  (
     si.pkStockItemID = '${pkStockItemID}'
     AND (si.pkStockItemID = oi.fkStockItemId)
     AND (oi.fkOrderID = o.pkOrderID)
  )`;

  return sqlQuery;
};

module.exports = selectInventoryItemOrderHistory;
