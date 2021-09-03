const checkLocationCodeSql = (locationCode) => {
  const strSQL = `script=DECLARE @ebaySets NVARCHAR(MAX);
                  SET @ebaySets = 'EBAY-SETS';

                  DECLARE @ebaySingles NVARCHAR(MAX);
                  SET @ebaySingles = 'EBAY-SINGLES';

                  DECLARE @ebayAdults NVARCHAR(MAX);
                  SET @ebayAdults = 'EBAY-ADULTS';

                  DECLARE @ebayLots NVARCHAR(MAX);
                  SET @ebayLots = 'EBAY-LOTS';

                  DECLARE @ebayGtcs NVARCHAR(MAX);
                  SET @ebayGtcs = 'EBAY-GTCS';

                  DECLARE @locationCode NVARCHAR(MAX);
                  SET @locationCode = '${locationCode}';

                  SELECT
                      si.CreationDate,
                      si.ItemTitle,
                      si.ItemNumber,
                      il.BinRackNumber,
                      sl.Quantity
                  FROM
                      StockItem si
                  LEFT OUTER JOIN ProductCategories pc ON si.CategoryId = pc.CategoryId
                  LEFT OUTER JOIN StockLevel sl on si.pkStockItemId = sl.fkStockItemId
                  LEFT OUTER JOIN StockLocation sLoc on sl.fkStockLocationid = sLoc.pkStockLocationId
                  LEFT OUTER JOIN ItemLocation il on il.fkStockItemId = si.pkStockItemID AND il.fkLocationId = sLoc.pkStockLocationId
                  WHERE
                      (
                      (pc.CategoryName = @ebaySets OR pc.CategoryName = @ebaySingles OR pc.CategoryName = @ebayAdults OR pc.CategoryName = @ebayLots OR pc.CategoryName = @ebayGtcs)
                      AND
                      (il.BinRackNumber = @locationCode)
                      AND
                      (sl.Quantity > 0 )
                      AND si.blogicalDelete = 0
                      )
                  ORDER BY
                  si.ItemNumber, sLoc.Location
                  `;
  return strSQL;
};

module.exports = checkLocationCodeSql;
