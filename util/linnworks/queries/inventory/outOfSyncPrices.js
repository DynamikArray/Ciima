const outOfSyncPrices = () => {
  const strSQL = `script=DECLARE @SETS VARCHAR(255) = 'EBAY-SETS';
                  DECLARE @SINGLES VARCHAR(255) = 'EBAY-SINGLES';

                  SELECT
                      si.pkStockItemID,
                      si.ItemNumber,
                      pc.CategoryName,
                      il.BinRackNumber as 'LocationCode',
                      si.ItemTitle,
                      sl.Quantity,
                      sl.InOrderBook,
                      sl.OnOrder,
                      si.RetailPrice,
                      sip.SalePrice as 'StockItemPrice',
                      el.ListingPrice as 'eBayListingPrice',
                      el.Qty as 'eBayQty',
                      el.ItemTitle as 'eBayTitle',
                      el.SKU as 'eBaySKU',
                      el.startTime as 'eBayStartTime',
                      el.endTime as 'eBayEndTime'
                  FROM
                      StockItem si,
                      ProductCategories pc,
                      ItemLocation il,
                      StockLevel sl,
                      StockItem_Pricing sip,
                      Automation_eBayListing el
                  WHERE
                  (
                      (pc.CategoryId = si.CategoryId)
                      AND (il.fkStockItemId = si.pkStockItemID)
                      AND (si.pkStockItemId = sl.fkStockItemId)
                      AND (sip.fkStockItemId = si.pkStockItemID)

                      AND (el.fkStockItemId = si.pkStockItemID)
                      AND (el.Active = 1)
                      AND (el.FixedPrice = 1)
                      AND (el.SiteId = 'US')

                      AND (si.bLogicalDelete = 0 OR si.isVariationGroup = 1)
                      AND (pc.CategoryName = @SETS OR pc.CategoryName = @SINGLES)
                      AND (sl.Quantity > 0)

                      AND (
                          si.RetailPrice <> sip.SalePrice
                          OR
                          sip.SalePrice <> el.ListingPrice
                          )
                  )
                  `;
  return strSQL;
};

module.exports = outOfSyncPrices;