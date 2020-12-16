const selectInventoryItemEbayListings = (pkStockItemID) => {
  const sqlQuery = `script=SELECT el.pkListId,
      el.ItemNumber,
      el.ItemTitle,
      el.startTime,
      el.endTime,
      el.Qty,
      el.Active,
      el.RelistPending,
      el.MappedBy,
      el.RelistedFromItemNumber,
      el.ListingPrice,
      el.SiteId,
      el.fkTemplateId,
      el.fkStockItemId,

      et.ListingStatus,
      et.IsErrorMsg as 'hasErrorMsg'
  FROM
      StockItem si,
      Automation_eBayListing el,
      eBay_Templates2 et
  WHERE
  (
    si.pkStockItemID = '${pkStockItemID}'
    AND (el.fkStockItemId = si.pkStockItemID)
    AND (el.SiteId = 'US')
    AND (et.fkInventoryItemId = si.pkStockItemID)
    AND (et.AccountId = 'EBAY1')
  )`;

  return sqlQuery;
};

module.exports = selectInventoryItemEbayListings;
