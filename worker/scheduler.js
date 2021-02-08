//scheduler
const schedule = require("node-schedule");
//ebay jobs
const { fetchEbayStartedToday, fetchEbayEndedToday } = require("./scheduleJobs/ebayJobs");
//linnworks jobs
const { fetchLinnworksInventory } = require("./scheduleJobs/linnworksJobs");

/*
const {
  repriceLotsWithNoLastPrice,
  repriceLotsWithLastPrice,
} = require("./scheduleJobs/repricer");
*/

const { soldItemsManager } = require("./scheduleJobs/soldItemsManager");
const { repricingManager } = require("./scheduleJobs/repricingManager");

//main schdule method
const scheduler = () => {
  /*
  //Fetch new items listed today
  const newItemsRule = new schedule.RecurrenceRule();
  newItemsRule.minute = [30];
  schedule.scheduleJob(newItemsRule, fetchEbayStartedToday);
  //Fetch new items ended today
  const endedItemsRule = new schedule.RecurrenceRule();
  endedItemsRule.minute = [40];
  schedule.scheduleJob(endedItemsRule, fetchEbayEndedToday);
  */

  /*
  //fetch linnworks items to map ids to locations
  const linnworksItemsRule = new schedule.RecurrenceRule();
  linnworksItemsRule.minute = [35, 45];
  schedule.scheduleJob(linnworksItemsRule, fetchLinnworksInventory);
  */

  //reprice items no last price
  //const withNoLastPriceRule = new schedule.RecurrenceRule();
  //withNoLastPriceRule.minute = [39];
  //schedule.scheduleJob(withNoLastPriceRule, repriceLotsWithNoLastPrice);

  //reprice items with last price
  //const withLastPriceRule = new schedule.RecurrenceRule();
  //withLastPriceRule.minute = [21];
  //schedule.scheduleJob(withLastPriceRule, repriceLotsWithLastPrice);

  const soldItemsRule = new schedule.RecurrenceRule();
  soldItemsRule.minute = [01, 31];
  schedule.scheduleJob(soldItemsRule, soldItemsManager);

  const repricingRule = new schedule.RecurrenceRule();
  repricingRule.minute = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
  schedule.scheduleJob(repricingRule, repricingManager);
};

module.exports = scheduler;
