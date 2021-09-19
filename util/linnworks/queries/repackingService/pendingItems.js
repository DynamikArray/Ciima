/*
const {
  perComicPriceThreshold,
  includeItemsInOrderBook,
  returnOnlyBelowThreshold,
} = require("../../../../server/config/appConstants").repackingService;
*/

function pendingItems() {
  const strSQL = `script=DECLARE @ebayLots NVARCHAR(MAX);
                  DECLARE @url VARCHAR(255) = CONCAT('https://s3-eu-west-1.amazonaws.com/images.linnlive.com/', lower(CONVERT(VARCHAR(32),HASHBYTES('MD5', CONVERT(VARCHAR(32), DB_NAME())), 2)) , '/');
                  SET @ebayLots = 'EBAY-LOTS';

                  SELECT
                      si.pkStockItemID,
                      si.CreationDate,
                      CONCAT(@url,LOWER(CONVERT(VARCHAR(40), sir.pkImageId)),'.jpg') AS 'Image',
                      si.ItemTitle,
                      si.ItemNumber,
                      il.BinRackNumber as LocationCode,
                      sl.Quantity,
                      sl.InOrderBook,
                      ep.IssueNumber as TotalIssues,
                      lp.LastPrice as CurrentListingPrice,
                      CAST(lp.LastPrice as money) / CAST(ep.IssueNumber as int) as PerComicPrice,
                      templates.startTime as ebayStartTime,
                      templates.endTime as ebayEndTime,
                      templates.Qty as ebayQty ,
                      templates.Active as ebayActive  ,
                      templates.RelistPending as ebayRelistPending ,
                      templates.LastUpdateDate as ebayLastUpdateDate ,
                      templates.ListingPrice as ebayListingPrice,
                      templates.ItemNumber as ebayItemNumber,
                      repack.repackPending as repackPending
                  FROM
                      StockItem si
                  LEFT OUTER JOIN ProductCategories pc ON si.CategoryId = pc.CategoryId
                  LEFT JOIN Stock_ImageReg sir on ((sir.fkStockItemId = si.pkStockItemID) AND (sir.IsMain = 1))
                  LEFT OUTER JOIN StockLevel sl on si.pkStockItemId = sl.fkStockItemId
                  LEFT OUTER JOIN StockLocation sLoc on sl.fkStockLocationid = sLoc.pkStockLocationId
                  LEFT OUTER JOIN ItemLocation il on il.fkStockItemId = si.pkStockItemID AND il.fkLocationId = sLoc.pkStockLocationId

                  LEFT OUTER JOIN (
                    SELECT si.ItemNumber, siep.ProperyValue AS [LastPrice], siep.pkRowId as 'LastPriceId'
                    FROM [StockItem] si
                    LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'LastPrice'
                  ) lp ON lp.ItemNumber = si.ItemNumber

                  LEFT OUTER JOIN (
                    SELECT si.ItemNumber, siep.ProperyValue AS [IssueNumber], siep.pkRowId as 'IssueNumberId'
                    FROM [StockItem] si
                    LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'Issue Number'
                  ) ep ON ep.ItemNumber = si.ItemNumber

                  LEFT OUTER JOIN (
                    SELECT si.ItemNumber, siep.ProperyValue AS [repackPending], siep.pkRowId as 'repackPendingId'
                    FROM [StockItem] si
                    LEFT OUTER JOIN [StockItem_ExtendedProperties] siep ON si.pkStockItemID = siep.fkStockItemID AND siep.ProperyName = 'repackPending'
                  ) repack ON repack.ItemNumber = si.ItemNumber


                  LEFT OUTER JOIN (
                    SELECT el.startTime, el.endTime, CAST(el.Qty as INTEGER)as Qty, CAST(el.Active as INTEGER)as Active,
                           CAST(el.RelistPending as INTEGER) as RelistPending, el.LastUpdateDate,
                           CAST(el.ListingPrice as MONEY)as ListingPrice, el.fkStockItemId, el.ItemNumber
                    FROM Automation_eBayListing el
                    WHERE Active = 1
                    ORDER BY LastUpdateDate desc OFFSET 0 ROWS
                  ) templates on templates.fkStockItemId = si.pkStockItemID

                  WHERE
                      (
                        (pc.CategoryName = @ebayLots)
                        AND (si.blogicalDelete = 0 )
                        AND (lp.LastPrice <> '')
                        AND (repackPending = 1)
                      )
                  ORDER BY PerComicPrice
                  `;
  return strSQL;
}

module.exports = { pendingItems };
