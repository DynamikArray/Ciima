const getRepricingItemsList = (repriced = false) => {
  let compareOperator = "<";
  if (repriced) compareOperator = ">";

  const strSql = `script=DECLARE @url VARCHAR(255) = CONCAT('https://s3-eu-west-1.amazonaws.com/images.linnlive.com/', lower(CONVERT(VARCHAR(32),HASHBYTES('MD5', CONVERT(VARCHAR(32), DB_NAME())), 2)) , '/');
  DECLARE @LOTS VARCHAR(255) = 'EBAY-LOTS';
  DECLARE @FromDate DATETIME = DATEADD(day,-1,GETDATE());
  DECLARE @ToDate DATETIME = GETDATE();

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
      extLastPrice.ProperyValue as 'LastPrice',
      extLastPriced.ProperyValue as 'LastPriced',
      si.CreationDate as 'ItemCreationDate',
      el.startTime as 'eBayStartTime',
      el.endTime as 'eBayEndTime'
  FROM
      StockItem si,
      ProductCategories pc,
      ItemLocation il,
      StockLevel sl,
      StockItem_Pricing sip,
      Stock_ImageReg sir,
      Automation_eBayListing el,
      StockItem_ExtendedProperties extLastPrice,
      StockItem_ExtendedProperties extLastPriced
  WHERE
  (
      (pc.CategoryId = si.CategoryId)
      AND (il.fkStockItemId = si.pkStockItemID)
      AND (si.pkStockItemId = sl.fkStockItemId)

      AND (sip.fkStockItemId = si.pkStockItemID)
      AND (sip.Tag = 'start')

      AND (sir.fkStockItemId = si.pkStockItemID)
      AND (sir.IsMain = 1)

      AND (el.fkStockItemId = si.pkStockItemID)
      AND (el.Active = 1)
      AND (el.FixedPrice = 0)
      AND (el.SiteId = 'US')
      AND (el.startTime BETWEEN @FromDate AND @ToDate)

      AND (si.bLogicalDelete = 0 OR si.isVariationGroup = 1)
      AND (pc.CategoryName = @LOTS)
      AND (sl.Quantity > 0)

      AND (si.pkStockItemId = extLastPrice.fkStockItemId AND extLastPrice.ProperyName = 'LastPrice' )
      AND (si.pkStockItemId = extLastPriced.fkStockItemId AND extLastPriced.ProperyName = 'LastPriced' )
      AND (CONVERT(datetime, extLastPriced.ProperyValue) ${compareOperator} CONVERT(datetime,  el.startTime))
  )
  ORDER BY ItemCreationDate ASC`;

  return strSql;
};

module.exports = { getRepricingItemsList };
