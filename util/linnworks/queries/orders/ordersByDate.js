const ordersByDate = (startDate, endDate, categoryName) => {
  const strSQL = `script=DECLARE @startDate Date;
  SET @startDate = '${startDate}';

  DECLARE @endDate Date;
  SET @endDate = '${endDate}';

  DECLARE @categoryName NVARCHAR(MAX);
  SET @categoryName = '${categoryName}';

  SELECT
    CAST(CAST(o.dProcessedOn AS DATE)  AS  VARCHAR(11)) AS 'processedOnDate',
    pc.CategoryName as 'categoryName',
    si.ItemNumber as 'linnworksSKU',
    si.ItemTitle as 'linnworksTitle',
    extMainCharacter.ProperyValue as 'mainCharacters',
    extPublishers.ProperyValue as 'publishers',
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
    (pc.CategoryName ='EBAY-LOTS')
   AND
    (o.dProcessedOn between @StartDate and @EndDate)
  )
  ORDER BY
    o.dProcessedOn ASC, o.norderID ASC `;

  return strSQL;
};

module.exports = { ordersByDate };
