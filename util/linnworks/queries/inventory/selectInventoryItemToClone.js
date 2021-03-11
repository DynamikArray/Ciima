const selectInventoryItemToClone = (pkStockItemID) => {
  const sqlQuery = `script=DECLARE @url VARCHAR(255) = CONCAT('https://s3-eu-west-1.amazonaws.com/images.linnlive.com/', lower(CONVERT(VARCHAR(32),HASHBYTES('MD5', CONVERT(VARCHAR(32), DB_NAME())), 2)) , '/');
  SELECT
    si.pkStockItemId as 'pkStockItemID',
    si.ItemNumber,
    pc.CategoryName,
    si.ItemTitle as 'inventoryTitle',
    il.BinRackNumber as 'locationCode',
    sl.Quantity as 'quantity',
    si.RetailPrice as 'price',
    dp.DeclinePrice as 'declinePrice',
    ed.ExtraDescription as 'extraDescription',
    mainChar.MainCharacter as 'mainCharacter',
    pub.Publisher as 'publisher',
    ebaySiteCat.ebaySiteCategoryId,
    ebayStoreCat1.ebayStoreCategoryIdOne,
    ebayStoreCat2.ebayStoreCategoryIdTwo
FROM
    StockItem si
    LEFT JOIN ProductCategories pc on pc.CategoryId = si.CategoryId
    LEFT JOIN Stock_ImageReg sir on ((sir.fkStockItemId = si.pkStockItemID) AND (sir.IsMain = 1))
    LEFT JOIN StockLevel sl on sl.fkStockItemId = si.pkStockItemId
    LEFT JOIN StockLocation sLoc on sLoc.pkStockLocationId = sl.fkStockLocationId
    LEFT JOIN ItemLocation il on il.fkStockItemId = si.pkStockItemID

    LEFT OUTER JOIN (
      SELECT si.ItemNumber, sip.SalePrice AS [ListingPrice], sip.pkRowId as 'ListingPriceId'
      FROM [StockItem] si
      LEFT OUTER JOIN [StockItem_Pricing] sip ON si.pkStockItemID = sip.fkStockItemId AND sip.Tag is null
    ) lp ON lp.ItemNumber = si.ItemNumber

    LEFT OUTER JOIN (
      SELECT si.ItemNumber, sip.SalePrice AS [DeclinePrice]
      FROM [StockItem] si
      LEFT OUTER JOIN [StockItem_Pricing] sip ON si.pkStockItemID = sip.fkStockItemId AND sip.Tag = 'DECLINE'
    ) dp ON dp.ItemNumber = si.ItemNumber

    LEFT OUTER JOIN (
      SELECT si.ItemNumber, siep.ProperyValue AS [ExtraDescription], siep.pkRowId as 'ExtraDescriptionId'
      FROM [StockItem] si
      LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'Extra Description'
    ) ed ON ed.ItemNumber = si.ItemNumber

    LEFT OUTER JOIN (
      SELECT si.ItemNumber, siep.ProperyValue AS [MainCharacter], siep.pkRowId as 'MainCharacterId'
      FROM [StockItem] si
      LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'Main Character'
    ) mainChar ON mainChar.ItemNumber = si.ItemNumber

    LEFT OUTER JOIN (
      SELECT si.ItemNumber, siep.ProperyValue AS [Publisher], siep.pkRowId as 'PublisherId'
      FROM [StockItem] si
      LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'Publisher'
    ) pub ON pub.ItemNumber = si.ItemNumber

    LEFT OUTER JOIN (
      SELECT si.ItemNumber, siep.ProperyValue AS [ebaySiteCategoryId]
      FROM [StockItem] si
      LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'Ebay Site Category 1'
    ) ebaySiteCat ON ebaySiteCat.ItemNumber = si.ItemNumber

    LEFT OUTER JOIN (
      SELECT si.ItemNumber, siep.ProperyValue AS [ebayStoreCategoryIdOne]
      FROM [StockItem] si
      LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'Ebay Store Category 1'
    ) ebayStoreCat1 ON ebayStoreCat1.ItemNumber = si.ItemNumber

    LEFT OUTER JOIN (
      SELECT si.ItemNumber, siep.ProperyValue AS [ebayStoreCategoryIdTwo]
      FROM [StockItem] si
      LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'Ebay Store Category 2'
    ) ebayStoreCat2 ON ebayStoreCat2.ItemNumber = si.ItemNumber


WHERE (si.pkStockItemId = '${pkStockItemID}');`;

  return sqlQuery;
};

module.exports = selectInventoryItemToClone;
