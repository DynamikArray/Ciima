const mysqlConnPool = require("../mysql/mysqlConnPool");

const saveInventoryPageToDb = async (values) => {
  const strQuery = `INSERT into slc_inventory (
    itemId,
    itemTitle,
    itemNumber,
    imageFull,
    imageThumb,
    price,
    sku,
    quantity,
    location,
    sourceProvider,
    startDateTime,
    endDateTime,
    hasEnded,
    quantitySold
  ) VALUES ? ON DUPLICATE KEY UPDATE itemId = VALUES(itemId), itemTitle = VALUES(itemTitle), itemNumber = VALUES(itemNumber), imageFull = VALUES(imageFull), imageThumb = VALUES(imageThumb), price = VALUES(price), sku = VALUES(sku),quantity = VALUES(quantity),
    location = VALUES(location),
    sourceProvider = VALUES(sourceProvider),
    startDateTime = VALUES(startDateTime),
    endDateTime = VALUES(endDateTime),
    hasEnded = VALUES(hasEnded),
    quantitySold = VALUES(quantitySold) ;`;
  try {
    const results = await mysqlConnPool.query(strQuery, [values]);
    return results;
  } catch (e) {
    return e;
  }
};
module.exports = { saveInventoryPageToDb };
