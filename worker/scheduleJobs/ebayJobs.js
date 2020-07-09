//Director
const inventoryDirector = require("../../util/inventory/inventoryDirector");
//date helpers
const { format, subDays } = require("date-fns");
//action CONSTANTS
const { LOAD_EBAY } = require("../../util/inventory/actions");

//const { logger } = require("../util/winston/winston.js");
const logger = require("../../util/winston/winston.js")({
  hostname: "Worker",
});

//Get stuff that started yesterday through today?
const fetchEbayStartedToday = async () => {
  logger.info("START fetchEbayStartedToday()");

  //setup todays date
  const today = new Date();
  dteStart = today.toISOString();
  dteEnd = subDays(today, 1).toISOString();
  //call our inventory function
  const loadInventoryResults = await inventoryDirector(LOAD_EBAY, {
    dates: {
      StartTimeFrom: dteEnd,
      StartTimeTo: dteStart,
    },
    hasEnded: 0,
  });

  logger.info(
    `END fetchEbayStartedToday() : Start:${dteStart} - End: ${dteEnd} | ${JSON.stringify(
      loadInventoryResults
    )}`
  );
};

//  NOT YET WORKING???
//Get everything that ended yesterday through today?
const fetchEbayEndedToday = async () => {
  logger.info("START fetchEbayEndedToday()");

  //setup todays date
  const today = new Date();
  dteStart = subDays(today, 1).toISOString();
  dteEnd = today.toISOString();

  //call our inventory function
  const loadInventoryResults = await inventoryDirector(LOAD_EBAY, {
    dates: {
      EndTimeFrom: dteStart,
      EndTimeTo: dteEnd,
    },
    hasEnded: 1,
  });

  logger.info(
    `END fetchEbayEndedToday() : Start:${dteStart} - End: ${dteEnd} | ${JSON.stringify(
      loadInventoryResults
    )}`
  );
};

module.exports = { fetchEbayStartedToday, fetchEbayEndedToday };
