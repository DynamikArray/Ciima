const outOfSyncPrices = () => {
  const strSQL = `script=DECLARE @SETS VARCHAR(255) = 'EBAY-SETS';
                  DECLARE @SINGLES VARCHAR(255) = 'EBAY-SINGLES';
                  DECLARE @url VARCHAR(255) = CONCAT('https://s3-eu-west-1.amazonaws.com/images.linnlive.com/', lower(CONVERT(VARCHAR(32),HASHBYTES('MD5', CONVERT(VARCHAR(32), DB_NAME())), 2)) , '/');

                  SELECT
                      si.pkStockItemID,
                      si.ItemNumber,
                      pc.CategoryName,
                      il.BinRackNumber as 'LocationCode',
                      CONCAT(@url,LOWER(CONVERT(VARCHAR(40), sir.pkImageId)),'.jpg') AS 'Image',
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
                      el.endTime as 'eBayEndTime',
                      et.ListingStatus as 'eBayListingStatus'
                  FROM
                      StockItem si,
                      ProductCategories pc,
                      ItemLocation il,
                      StockLevel sl,
                      StockItem_Pricing sip,
                      Stock_ImageReg sir,
                      Automation_eBayListing el,
                      eBay_Templates2 et
                  WHERE
                  (
                      (pc.CategoryId = si.CategoryId)
                      AND (il.fkStockItemId = si.pkStockItemID)
                      AND (si.pkStockItemId = sl.fkStockItemId)
                      AND (sip.fkStockItemId = si.pkStockItemID)

                      AND (sir.fkStockItemId = si.pkStockItemID)
                      AND (sir.IsMain = 1)

                      AND (el.fkStockItemId = si.pkStockItemID)
                      AND (el.Active = 1)
                      AND (el.FixedPrice = 1)
                      AND (el.SiteId = 'US')

                      AND (et.fkInventoryItemId = si.pkStockItemID)
                      AND (et.ListingStatus = 'Ok' OR et.ListingStatus = 'Updating')
                      AND (et.AccountId = 'EBAY1')

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
