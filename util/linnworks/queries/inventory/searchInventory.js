const buildSearchString = (searchString) => {
  if (searchString.length > 0) {
    const words = searchString.split(" ").reduce((acc, word, index) => {
      const strPhrase = index > 0 ? " AND" : "";
      acc.push(
        `${strPhrase} si.ItemTitle LIKE CONCAT('%','${word.toString()}','%')`
      );
      return acc;
    }, []);

    words.unshift("(");
    words.push(")");
    words.unshift("AND");

    return words.join("");
  }
  return "";
};

const buildCategoriesString = (categoriesString) => {
  if (categoriesString.length > 0) {
    const words = categoriesString.reduce((acc, word, index) => {
      const strPhrase = index > 0 ? " OR" : "";
      acc.push(`${strPhrase} pc.CategoryName = '${word.toString()}'`);
      return acc;
    }, []);

    words.unshift("(");
    words.push(")");
    words.unshift("AND");

    return words.join("");
  }
  return "";
};

const buildBinRackString = (binRackString) => {
  if (binRackString.length > 0) {
    return `AND (il.BinRackNumber LIKE CONCAT('%','${binRackString}','%'))`;
  }
  return "";
};

const searchInventory = (
  searchString,
  categoriesString = [],
  binRackString
) => {
  let searchSQL = "";
  if (searchString) searchSQL = buildSearchString(searchString);

  let categoriesSQL = "";
  if (categoriesString) categoriesSQL = buildCategoriesString(categoriesString);

  let binRackSQL = "";
  if (binRackString) binRackSQL = buildBinRackString(binRackString);

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
      lp.ListingPrice,
      dp.DeclinePrice,
      sp.StartPrice
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

    WHERE
    (
        (pc.CategoryId = si.CategoryId)
        ${binRackSQL}
        ${searchSQL}
        ${categoriesSQL}
    );`;

  return sqlQuery;
};

module.exports = searchInventory;
