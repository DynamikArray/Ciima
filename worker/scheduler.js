//scheduler
const schedule = require("node-schedule");
//ebay jobs
const {
  fetchEbayStartedToday,
  fetchEbayEndedToday
} = require("./scheduleJobs/ebayJobs");
//linnworks jobs
const { fetchLinnworksInventory } = require("./scheduleJobs/linnworksJobs");
const {
  repriceLotsWithNoLastPrice,
  repriceLotsWithLastPrice
} = require("./scheduleJobs/repricer");

//main schdule method
const scheduler = () => {
  //Fetch new items listed today
  const newItemsRule = new schedule.RecurrenceRule();
  newItemsRule.minute = [1, 30];
  // schedule.scheduleJob(newItemsRule, fetchEbayStartedToday);

  //Fetch new items ended today
  const endedItemsRule = new schedule.RecurrenceRule();
  endedItemsRule.minute = [15, 45];
  schedule.scheduleJob(endedItemsRule, fetchEbayEndedToday);

  //fetch linnworks items to map ids to locations
  const linnworksItemsRule = new schedule.RecurrenceRule();
  linnworksItemsRule.minute = [5, 20, 35, 50];
  schedule.scheduleJob(linnworksItemsRule, fetchLinnworksInventory);

  //reprice items no last price
  const withNoLastPriceRule = new schedule.RecurrenceRule();
  withNoLastPriceRule.minute = [40];
  //schedule.scheduleJob(withNoLastPriceRule, repriceLotsWithNoLastPrice);

  //reprice items with last price
  const withLastPriceRule = new schedule.RecurrenceRule();
  withLastPriceRule.minute = [40];
  //schedule.scheduleJob(withLastPriceRule, repriceLotsWithLastPrice);
};

module.exports = scheduler;
