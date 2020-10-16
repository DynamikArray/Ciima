const dailySoldItems = (startDate, endDate) => {
  const strSQL = `script=DECLARE @startDate Date;
  SET @startDate = '${startDate}';

  DECLARE @endDate Date;
  SET @endDate = '${endDate}';

  DECLARE @ebaySingles NVARCHAR(MAX);
  SET @ebaySingles = 'EBAY-SINGLES';

  DECLARE @ebaySets NVARCHAR(MAX);
  SET @ebaySets = 'EBAY-SETS';

  DECLARE @ebayLots NVARCHAR(MAX);
  SET @ebayLots = 'EBAY-LOTS';

  SELECT
    CAST(CAST(o.dProcessedOn AS DATE)  AS  VARCHAR(11)) AS 'processedOnDate',
    CAST(CAST(si.CreationDate AS DATE)  AS  VARCHAR(11)) AS 'linnworksCreationDate',
    pc.CategoryName as 'categoryName',
    si.ItemNumber as 'linnworksSKU',
    si.ItemTitle as 'linnworksTitle',
    oi.fPricePerUnit as 'pricePerUnit'
  FROM
    [Order] o
    INNER JOIN OrderItem oi on o.pkOrderID = oi.fkOrderID
    LEFT OUTER JOIN [StockItem] si on si.pkstockItemId = oi.fkStockItemID_processed
    LEFT OUTER JOIN [ProductCategories] pc on pc.CategoryId = si.CategoryId
    LEFT OUTER JOIN [StockItem_ExtendedProperties] extMainCharacter on si.pkStockItemId = extMainCharacter.fkStockItemId AND extMainCharacter.ProperyName = 'Main Character'
    LEFT OUTER JOIN [StockItem_ExtendedProperties] extPublishers on si.pkStockItemId = extPublishers.fkStockItemId AND extPublishers.ProperyName = 'Publisher'
  WHERE
  (
    (pc.CategoryName = @ebaySingles OR pc.CategoryName = @ebaySets OR pc.CategoryName = @ebayLots )
   AND
    (o.dProcessedOn between @StartDate and @EndDate)
  )
  ORDER BY
    o.dProcessedOn ASC, o.norderID ASC `;

  return strSQL;
};

module.exports = { dailySoldItems };
