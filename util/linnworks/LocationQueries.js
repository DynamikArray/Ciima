const locationsSql = (pageNumber, perPage) => {
  const strSQL = `
script=DECLARE @ebaySets NVARCHAR(MAX);
SET @ebaySets = 'EBAY-SETS';

DECLARE @ebaySingles NVARCHAR(MAX);
SET @ebaySingles = 'EBAY-SINGLES';

DECLARE @ebayAdults NVARCHAR(MAX);
SET @ebayAdults = 'EBAY-ADULTS';

DECLARE @EntriesPerPage INT;
SET @EntriesPerPage = '${perPage}';

DECLARE @PageNumber INT;
SET @PageNumber = '${pageNumber}';

SELECT
    si.ItemNumber,
    il.BinRackNumber,
    sl.Quantity
FROM
    StockItem si
LEFT OUTER JOIN ProductCategories pc ON si.CategoryId = pc.CategoryId
LEFT OUTER JOIN StockLevel sl on si.pkStockItemId = sl.fkStockItemId
LEFT OUTER JOIN StockLocation sLoc on sl.fkStockLocationid = sLoc.pkStockLocationId
LEFT OUTER JOIN ItemLocation il on il.fkStockItemId = si.pkStockItemID AND il.fkLocationId = sLoc.pkStockLocationId
WHERE (pc.CategoryName = @ebaySets OR pc.CategoryName = @ebaySingles OR pc.CategoryName = @ebayAdults)
AND si.blogicalDelete = 0
ORDER BY
si.ItemNumber, sLoc.Location
OFFSET @EntriesPerPage * (@PageNumber - 1) ROWS
FETCH NEXT @EntriesPerPage ROWS ONLY;
`;

  return strSQL;
};

module.exports = { locationsSql };
