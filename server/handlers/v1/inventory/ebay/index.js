//const queryString = require("query-string");
const inventoryDirector = require("../../../../../util/inventory/inventoryDirector");
const { format, subDays, addDays } = require("date-fns");

//action CONSTANTS
const { LOAD_EBAY } = require("../../../../../util/inventory/actions");

module.exports = fastify => ({
  loadInventoryHandler: async (req, res) => {
    const { startDate, endDate, hasEnded } = req.body;
    //Setup our dateParams, get these from body later
    let dteStart = new Date(startDate).toISOString();
    let dteEnd = new Date(endDate).toISOString();

    const options = {};
    if (!hasEnded) {
      options.dates = {
        StartTimeFrom: dteStart,
        StartTimeTo: dteEnd
      };
      options.hasEnded = 0;
    }

    if (hasEnded) {
      options.dates = {
        EndTimeFrom: dteStart,
        EndTimeTo: dteEnd
      };
      options.hasEnded = 1;
    }

    //call our inventory function
    const loadInventoryResults = await inventoryDirector(LOAD_EBAY, {
      ...options
    });

    //return the resuts
    return { results: loadInventoryResults };
  }
});
