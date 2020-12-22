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
      (si.pkStockItemId = sl.fkStockItemId)

      AND (pc.CategoryId = si.CategoryId)

      AND (il.fkStockItemId = si.pkStockItemID AND il.fkLocationId = sLoc.pkStockLocationId)
      ${binRackSQL}

      AND (sl.fkStockLocationid = sLoc.pkStockLocationId)

      AND (sir.fkStockItemId = si.pkStockItemID)
      AND (sir.IsMain = 1)

      AND (sip.fkStockItemId = si.pkStockItemID AND sip.SalePrice <> '')

      AND (si.pkStockItemId = extExtraDesc.fkStockItemId AND extExtraDesc.ProperyName = 'Extra Description' )
      AND (si.pkStockItemId = extIssueNumber.fkStockItemId AND extIssueNumber.ProperyName = 'Issue Number' )

      ${searchSQL}

      ${categoriesSQL}
  );`;

  return sqlQuery;
};

module.exports = searchInventory;