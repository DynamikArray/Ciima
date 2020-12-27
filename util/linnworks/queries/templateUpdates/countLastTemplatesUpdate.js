const countLastTemplateUpdate = (
  categoryName,
  extPropValue = false,
  listingStatus = false
) => {
  function handleTemplateUpdateValue(extPropValue = false) {
    if (!extPropValue)
      return `AND ( (extProp.ExtPropLastTemplateUpdate IS NULL) )`;
    if (extPropValue)
      return `AND ( (extProp.ExtPropLastTemplateUpdate = '${extPropValue}') )`;
  }

  function handleListingStatus(listingStatus = false) {
    if (!listingStatus) return "";
    if (listingStatus) return `AND (et.ListingStatus = '${listingStatus}')`;
  }

  const strSQL = `script=DECLARE @CAT VARCHAR(255) = '${categoryName}';
  SELECT COUNT(*) as templateCount
  FROM (
      SELECT
        DISTINCT si.pkStockItemID,
        si.ItemNumber,
        si.ItemTitle,
        pc.CategoryName,
        extProp.ExtPropLastTemplateUpdate as LastTemplateUpdate,
        et.ListingStatus,
        et.IsErrorMsg
      FROM
        StockItem si
        LEFT OUTER JOIN ProductCategories pc on si.CategoryId = pc.CategoryId

        LEFT OUTER JOIN eBay_Templates2 et on et.fkInventoryItemId = si.pkStockItemID

        LEFT OUTER JOIN StockItem_ExtendedProperties siep on si.pkStockItemID = siep.fkStockitemId
        LEFT OUTER JOIN (SELECT si.ItemNumber, siep.ProperyValue AS [ExtPropLastTemplateUpdate]
                          FROM [StockItem] si
                          LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID
                          AND siep.ProperyName = 'LastTemplateUpdate') extProp ON extProp.ItemNumber = si.ItemNumber

      WHERE
      (
        (pc.CategoryId = si.CategoryId)
        AND (si.bLogicalDelete = 0 OR si.isVariationGroup = 1)
        AND (pc.CategoryName = @CAT)

        ${handleTemplateUpdateValue(extPropValue)}

        ${handleListingStatus(listingStatus)}
      )
  ) notUpdated`;

  return strSQL;
};

module.exports = countLastTemplateUpdate;
