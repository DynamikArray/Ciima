//scheduler
const schedule = require("node-schedule");
//ebay jobs
const {
  fetchEbayStartedToday,
  fetchEbayEndedToday
} = require("./scheduleJobs/ebayJobs");
//linnworks jobs
const { fetchLinnworksInventory } = require("./scheduleJobs/linnworksJobs");

//main schdule method
const scheduler = () => {
  //Fetch new items listed today
  const newItemsRule = new schedule.RecurrenceRule();
  newItemsRule.minute = [1, 30];
  //Fetch new items ended today
  const endedItemsRule = new schedule.RecurrenceRule();
  endedItemsRule.minute = [15, 45];
  //fetch linnworks items to map ids to locations
  const linnworksItemsRule = new schedule.RecurrenceRule();
  linnworksItemsRule.minute = [5, 20, 35, 50];

  //Schedule the acutal jobs with the rules
  schedule.scheduleJob(newItemsRule, fetchEbayStartedToday);
  schedule.scheduleJob(endedItemsRule, fetchEbayEndedToday);
  schedule.scheduleJob(linnworksItemsRule, fetchLinnworksInventory);
};

module.exports = scheduler;
