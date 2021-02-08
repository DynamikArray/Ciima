/*


  THIS IS NOT BEING USED



*/

const { linnworks } = require("../../util/linnworks/linnworks.js");
const executeCustomScriptQuery = require("../../util/linnworks/helpers/executeCustomScriptQuery.js");

const publishMessage = require("../../util/amqp/publishMessage.js");
const { REPRICE_ITEM } = require("../../util/amqp/queueActionsList.js");

/* QUERIES */
const lotsNoLastPrice = require("../../util/linnworks/queries/repricer/lots/lotsNoLastPrice.js");
const lotsWithLastPrice = require("../../util/linnworks/queries/repricer/lots/lotsWithLastPrice.js");

const repriceLotsWithNoLastPrice = async () => {
  try {
    linnworks.logger.debug("Starting Repricer (Lots With No Last Price)");
    //we dont use payload yet
    let pageNumber = 1;
    let perPage = 500;
    let more = true;

    while (more === true) {
      const sql = lotsNoLastPrice(pageNumber, perPage);
      const fetchedPage = await executeCustomScriptQuery(sql);
      //get items and loop
      const items = fetchedPage.result.Results;
      items.forEach((item) => {
        publishItemToQueue(item);
      });
      //Handle record paging
      const { TotalResults } = fetchedPage.result;
      if (TotalResults == perPage) {
        pageNumber++;
      } else {
        more = false;
      }
    }
  } catch (e) {
    linnworks.logger.error(e);
  } finally {
    linnworks.logger.debug("Finally - Ending Repricer (Lots With No Last Price)");
  }
};

const repriceLotsWithLastPrice = async () => {
  try {
    linnworks.logger.debug("Starting Repricer (Lots With Last Price)");
    //we dont use payload yet
    let pageNumber = 1;
    let perPage = 500;
    let more = true;

    while (more === true) {
      const sql = lotsWithLastPrice(pageNumber, perPage);
      const fetchedPage = await executeCustomScriptQuery(sql);
      //get items and loop
      const items = fetchedPage.result.Results;
      items.forEach((item) => {
        publishItemToQueue(item);
      });
      //Handle record paging
      const { TotalResults } = fetchedPage.result;
      if (TotalResults == perPage) {
        pageNumber++;
      } else {
        more = false;
      }
    }
  } catch (e) {
    linnworks.logger.error(e);
  } finally {
    linnworks.logger.debug("Finally - Ending Repricer (Lots With Last Price)");
  }
};

/**
 * [publishItemToQueue description]
 * @param  {[type]} item [description]
 * @return {[type]}      [description]
 */
const publishItemToQueue = (item) => {
  const payload = {
    action: REPRICE_ITEM,
    pkStockItemID: item.pkStockItemID,
    CreationDate: item.CreationDate,
    ItemTitle: item.ItemTitle,
    BinRackNumber: item.BinRackNumber,
    AvailableQty: item.AvailableQty,
  };
  linnworks.logger.debug(`SUBMIT REPRICE JOB ${JSON.stringify(payload)}`);
  //call our publisher helper
  publishMessage(JSON.stringify(payload));
};

module.exports = { repriceLotsWithNoLastPrice, repriceLotsWithLastPrice };
