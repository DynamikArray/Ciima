const selectInventoryItemDetails = (pkStockItemID) => {
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
  );`;

  return sqlQuery;
};

module.exports = selectInventoryItemDetails;
