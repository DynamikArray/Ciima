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

const searchInventory = (searchString, categoriesString = []) => {
  let searchSQL = "";
  if (searchString) searchSQL = buildSearchString(searchString);

  let categoriesSQL = "";
  if (categoriesString) categoriesSQL = buildCategoriesString(categoriesString);

  const sqlQuery = `script=SELECT
      si.CreationDate,
      pc.CategoryName,
      si.ItemTitle,
      si.ItemNumber,
      il.BinRackNumber,
      sl.Quantity
  FROM
      StockItem si,
      ProductCategories pc,
      StockLevel sl,
      StockLocation sLoc,
      ItemLocation il
  WHERE
  (
      (si.pkStockItemId = sl.fkStockItemId)
      AND
      (pc.CategoryId = si.CategoryId)
      AND
      (il.fkStockItemId = si.pkStockItemID AND il.fkLocationId = sLoc.pkStockLocationId)
      AND
      (sl.fkStockLocationid = sLoc.pkStockLocationId)
      ${searchSQL}
      ${categoriesSQL}
  );`;

  return sqlQuery;
};

module.exports = searchInventory;
