const schedule = require("node-schedule");
const {
  fetchEbayStartedToday,
  fetchEbayEndedToday
} = require("./scheduleJobs/ebayJobs");

const scheduler = () => {
  const newItemsRule = new schedule.RecurrenceRule();
  newItemsRule.minute = [1, 30];

  const endedItemsRule = new schedule.RecurrenceRule();
  endedItemsRule.minute = [15, 45];

  //Handle job scheduling in here?
  schedule.scheduleJob(newItemsRule, fetchEbayStartedToday);
  schedule.scheduleJob(endedItemsRule, fetchEbayEndedToday);
};

module.exports = scheduler;
