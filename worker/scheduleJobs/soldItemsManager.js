/**
 * Gets our sold items from linnworks, needs to be able to run without
 * parameters (maybe with incase we want to back fill data???)
 * and be able to insertOrUpdate? records as they come in?
 */

const logger = require("../../util/winston/winston.js")({
  hostname: "Worker",
});

const getSoldItems = require("../../util/soldItems/getSoldItems");
const saveSoldItemsToDb = require("../../util/soldItems/saveSoldItemsToDb");

const soldItemsManager = async () => {
  logger.info("START getSoldItems()");
  const results = await getSoldItems();

  if (results.result) {
    const valuesOnly = results.result.map((item) => {
      return Object.values(item);
    });

    if (valuesOnly.length > 0) {
      const saved = await saveSoldItemsToDb(valuesOnly);
      logger.info(saved);
    } else {
      logger.info("getSoldItems - No Values to send to db");
    }
  }
  logger.info("END getSoldItems()");
};

module.exports = { soldItemsManager };
