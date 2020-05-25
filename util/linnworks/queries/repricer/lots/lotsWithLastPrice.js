const lotsWithLastPrice = (pageNumber, perPage) => {
  const strSQL = `
  script=DECLARE @EntriesPerPage INT;
          SET @EntriesPerPage = '${perPage}';

          DECLARE @PageNumber INT;
          SET @PageNumber = '${pageNumber}';

          DECLARE @ebayLots NVARCHAR(MAX);
          SET @ebayLots = 'EBAY-LOTS';

          SELECT
              si.pkStockItemID,
              si.ItemNumber,
              si.CreationDate,
              si.ItemTitle,
              (sl.Quantity - sl.InOrderBook) as 'AvailableQty',
              sLoc.Location,
              il.BinRackNumber,
              pc.CategoryName,
              /* START FOR TESTING */
              extTestingFlag.ProperyValue as 'TestingFlag',
              /* END FOR TESTING */
              extLastPrice.ProperyValue as 'LastPrice',
              extLastPriced.ProperyValue as 'LastPriced'
          FROM
              StockItem si
          LEFT OUTER JOIN ProductCategories pc ON si.CategoryId = pc.CategoryId
          LEFT OUTER JOIN StockLevel sl on si.pkStockItemId = sl.fkStockItemId
          LEFT OUTER JOIN StockLocation sLoc on sl.fkStockLocationid = sLoc.pkStockLocationId
          LEFT OUTER JOIN ItemLocation il on il.fkStockItemId = si.pkStockItemID AND il.fkLocationId = sLoc.pkStockLocationId
          LEFT OUTER JOIN StockItem_ExtendedProperties extLastPrice on si.pkStockItemId = extLastPrice.fkStockItemId AND extLastPrice.ProperyName = 'LastPrice'
          LEFT OUTER JOIN StockItem_ExtendedProperties extLastPriced on si.pkStockItemId = extLastPriced.fkStockItemId AND extLastPriced.ProperyName = 'LastPriced'
          /* START FOR TESTING */
          LEFT OUTER JOIN StockItem_ExtendedProperties extTestingFlag on si.pkStockItemId = extTestingFlag.fkStockItemId AND extTestingFlag.ProperyName = 'TestingFlag'
          /* END FOR TESTING */
          WHERE (pc.CategoryName = @ebayLots)
          AND si.blogicalDelete = 0
          AND (sl.Quantity - sl.InOrderBook > 0)
          AND extLastPriced.ProperyValue IS NOT NULL
          AND extLastPrice.ProperyValue IS NOT NULL
          AND si.CreationDate < DATEADD(day, -5, GETDATE())
          /* START FOR TESTING */
          AND extTestingFlag.ProperyValue = 1
          /* END FOR TESTING */
          ORDER BY si.CreationDate

          OFFSET @EntriesPerPage * (@PageNumber - 1) ROWS
          FETCH NEXT @EntriesPerPage ROWS ONLY;
          `;

  return strSQL;
};

module.exports = lotsWithLastPrice;
