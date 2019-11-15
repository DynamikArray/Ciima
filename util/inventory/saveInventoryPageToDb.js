const mysqlConnPool = require("../mysql/mysqlConnPool.js");

const saveInventoryPageToDb = async values => {
  const query = `INSERT into slc_inventory (
    itemId,
    itemTitle,
    itemNumber,
    imageFull,
    imageThumb,
    price,
    sku,
    quantity,
    location,
    binRack,
    boxOnly,
    boxDepth,
    sourceProvider,
    startDateTime,
    endDateTime
  ) VALUES ? ON DUPLICATE KEY UPDATE
    itemId = VALUES(itemId),
    itemTitle = VALUES(itemTitle),
    itemNumber = VALUES(itemNumber),
    imageFull = VALUES(imageFull),
    imageThumb = VALUES(imageThumb),
    price = VALUES(price),
    sku = VALUES(sku),
    quantity = VALUES(quantity),
    location = VALUES(location),
    boxOnly = VALUES(boxOnly),
    binRack = VALUES(binRack),
    boxDepth = VALUES(boxDepth),
    sourceProvider = VALUES(sourceProvider),
    startDateTime = VALUES(startDateTime),
    endDateTime = VALUES(endDateTime);`;

  const results = await mysqlConnPool.query(query, [values]);

  return results;
};
module.exports = { saveInventoryPageToDb };
