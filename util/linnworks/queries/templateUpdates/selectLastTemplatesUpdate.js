const selectLastTemplateUpdate = (
  categoryName,
  extPropValue,
  listingStatus,
  batchSize
) => {
  function handleTemplateUpdateValue(extPropValue = false) {
    if (!extPropValue)
      return `AND ( extProp.ExtPropLastTemplateUpdate IS NULL )`;
    if (extPropValue)
      return `AND ( (extProp.ExtPropLastTemplateUpdate = '${extPropValue}') )`;
  }

  function handleListingStatus(listingStatus = false) {
    if (!listingStatus) return "";
    if (listingStatus) return `AND (et.ListingStatus = '${listingStatus}')`;
  }

  function handleBatchSize(batchSize = 100) {
    if (!batchSize) return 100;
    if (batchSize) return batchSize;
  }

  const strSQL = `script=DECLARE @CAT VARCHAR(255) = '${categoryName}';
    SELECT
      DISTINCT TOP ${handleBatchSize(batchSize)} si.pkStockItemID,
      si.ItemNumber,
      si.ItemTitle,
      pc.CategoryName,
      extProp.ExtPropLastTemplateUpdate as LastTemplateUpdate,
      et.ListingStatus,
      et.IsErrorMsg,
      fi.ObjectXML.value('(/EbayListing/ErrorMessage)[1]','nvarchar(max)') as errorMessage
    FROM
      StockItem si
      LEFT OUTER JOIN ProductCategories pc on si.CategoryId = pc.CategoryId
    
      LEFT OUTER JOIN eBay_Templates2 et on et.fkInventoryItemId = si.pkStockItemID
      LEFT OUTER JOIN FlexSettings_Item fi on fi.pkObjectId = et.fkFlexItemId

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
    ORDER BY si.ItemNumber DESC`;

  return strSQL;
};

module.exports = selectLastTemplateUpdate;
