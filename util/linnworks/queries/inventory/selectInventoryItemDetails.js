const selectInventoryItemDetails = (pkStockItemID) => {
  /*
  const sqlQuery = `script=DECLARE @url VARCHAR(255) = CONCAT('https://s3-eu-west-1.amazonaws.com/images.linnlive.com/', lower(CONVERT(VARCHAR(32),HASHBYTES('MD5', CONVERT(VARCHAR(32), DB_NAME())), 2)) , '/');
    SELECT
      si.pkStockItemId as 'pkStockItemID',
      CONCAT(@url,LOWER(CONVERT(VARCHAR(40), sir.pkImageId)),'.jpg') AS 'Image',
      si.CreationDate,
      pc.CategoryName,
      si.ItemTitle,
      si.ItemNumber,
      il.BinRackNumber,
      sl.Quantity,
      si.RetailPrice,
      sip.SalePrice as 'ListingPrice',
      extExtraDesc.ProperyValue as 'ExtraDescription',
      extIssueNumber.ProperyValue as 'IssueNumbers'
  FROM
      StockItem si,
      StockItem_Pricing sip,
      ProductCategories pc,
      StockLevel sl,
      StockLocation sLoc,
      ItemLocation il,
      Stock_ImageReg sir,
      StockItem_ExtendedProperties extExtraDesc,
      StockItem_ExtendedProperties extIssueNumber
  WHERE
  (
      (si.pkStockItemId = '${pkStockItemID}')
      AND (si.pkStockItemId = sl.fkStockItemId)
      AND (pc.CategoryId = si.CategoryId)
      AND (il.fkStockItemId = si.pkStockItemID AND il.fkLocationId = sLoc.pkStockLocationId)
      AND (sl.fkStockLocationid = sLoc.pkStockLocationId)
      AND (sir.fkStockItemId = si.pkStockItemID)
      AND (sir.IsMain = 1)
      AND (sip.fkStockItemId = si.pkStockItemID AND sip.SalePrice <> '')
      AND (si.pkStockItemId = extExtraDesc.fkStockItemId AND extExtraDesc.ProperyName = 'Extra Description' )
      AND (si.pkStockItemId = extIssueNumber.fkStockItemId AND extIssueNumber.ProperyName = 'Issue Number' )
  );`; */

  const sqlQuery = `script=DECLARE @url VARCHAR(255) = CONCAT('https://s3-eu-west-1.amazonaws.com/images.linnlive.com/', lower(CONVERT(VARCHAR(32),HASHBYTES('MD5', CONVERT(VARCHAR(32), DB_NAME())), 2)) , '/');
    SELECT
      si.pkStockItemId as 'pkStockItemID',
      CONCAT(@url,LOWER(CONVERT(VARCHAR(40), sir.pkImageId)),'.jpg') AS 'Image',
      si.CreationDate,
      pc.CategoryName,
      si.ItemTitle,
      si.ItemNumber,
      il.BinRackNumber,
      il.fkLocationId as 'LocationId',
      sl.Quantity,
      si.RetailPrice,
      lp.ListingPrice,
      dp.DeclinePrice,
      sp.StartPrice,
      ed.ExtraDescription,
      ed.ExtraDescriptionId
  FROM
      StockItem si
      LEFT JOIN ProductCategories pc on pc.CategoryId = si.CategoryId
      LEFT JOIN Stock_ImageReg sir on ((sir.fkStockItemId = si.pkStockItemID) AND (sir.IsMain = 1))
      LEFT JOIN StockLevel sl on sl.fkStockItemId = si.pkStockItemId
      LEFT JOIN StockLocation sLoc on sLoc.pkStockLocationId = sl.fkStockLocationId
      LEFT JOIN ItemLocation il on il.fkStockItemId = si.pkStockItemID

      LEFT OUTER JOIN (
        SELECT si.ItemNumber, sip.SalePrice AS [ListingPrice]
        FROM [StockItem] si
        LEFT OUTER JOIN [StockItem_Pricing] sip ON si.pkStockItemID = sip.fkStockItemId AND sip.Tag is null
      ) lp ON lp.ItemNumber = si.ItemNumber

      LEFT OUTER JOIN (
        SELECT si.ItemNumber, sip.SalePrice AS [DeclinePrice]
        FROM [StockItem] si
        LEFT OUTER JOIN [StockItem_Pricing] sip ON si.pkStockItemID = sip.fkStockItemId AND sip.Tag = 'DECLINE'
      ) dp ON dp.ItemNumber = si.ItemNumber

      LEFT OUTER JOIN (
        SELECT si.ItemNumber, sip.SalePrice AS [StartPrice]
        FROM [StockItem] si
        LEFT OUTER JOIN [StockItem_Pricing] sip ON si.pkStockItemID = sip.fkStockItemId AND sip.Tag = 'START'
      ) sp ON sp.ItemNumber = si.ItemNumber

      LEFT OUTER JOIN (
        SELECT si.ItemNumber, siep.ProperyValue AS [ExtraDescription], siep.pkRowId as 'ExtraDescriptionId'
        FROM [StockItem] si
        LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'Extra Description'
      ) ed ON ed.ItemNumber = si.ItemNumber

  WHERE (si.pkStockItemId = '${pkStockItemID}');`;

  return sqlQuery;
};

module.exports = selectInventoryItemDetails;
