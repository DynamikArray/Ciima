const categorySalesByDate = (startDate, endDate, categoryName) => {
  const strSQL = `script=DECLARE @startDate Date;
      SET @startDate = '${startDate}';

      DECLARE @endDate Date;
      SET @endDate = '${endDate}';

      DECLARE @categoryName NVARCHAR(MAX);
      SET @categoryName = '${categoryName}';

      SELECT
        CAST(CAST(o.dReceievedDate AS DATE)  AS  VARCHAR(11)) AS 'ReceievedDate',
        c.CategoryName,
        COUNT(si.pkStockItemID)as 'ItemsSold',
        SUM(oi.fPricePerUnit) as 'OrderItemsValue'
      FROM [OrderItem] oi
        INNER JOIN [Order] o on o.pkOrderID = oi.fkOrderID
        LEFT OUTER JOIN [StockItem] si on si.pkStockItemID = oi.fkStockItemId
        LEFT OUTER JOIN [ProductCategories] c on c.CategoryId = si.CategoryId
      WHERE
      (
        c.CategoryName = @categoryName
        AND
        (o.dReceievedDate > @startDate AND o.dReceievedDate < @endDate)
      )
      GROUP BY CAST(CAST(o.dReceievedDate AS DATE)  AS  VARCHAR(11)), c.CategoryName
      ORDER BY CAST(CAST(o.dReceievedDate AS DATE)  AS  VARCHAR(11)) DESC `;

  return strSQL;
};

module.exports = { categorySalesByDate };
