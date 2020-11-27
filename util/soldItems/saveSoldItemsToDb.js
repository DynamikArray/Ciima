const logger = require("../../util/winston/winston.js")({
  hostname: "Worker",
});

const mysqlConnPool = require("../mysql/mysqlConnPool.js");

const saveSoldItemsToDb = async (values) => {
  logger.info("STARTING - saveSoldItemsToDb");

  const strQuery = `INSERT into slc_sold_items (
    orderId,
    processedOnDate,
    linnworksCreationDate,
    categoryName,
    linnworksSKU,
    linnworksTitle,
    pricePerUnit
  ) VALUES ? ON DUPLICATE KEY UPDATE orderId = VALUES(orderId), processedOnDate = VALUES(processedOnDate), categoryName = VALUES(categoryName), linnworksCreationDate = VALUES(linnworksCreationDate), linnworksSKU = VALUES(linnworksSKU), linnworksTitle = VALUES(linnworksTitle),  pricePerUnit = VALUES(pricePerUnit) ;`;
  try {
    return await mysqlConnPool.query(strQuery, [values]);
  } catch (e) {
    return e;
  } finally {
    logger.info("ENDING - saveSoldItemsToDb");
  }
};
module.exports = saveSoldItemsToDb;
