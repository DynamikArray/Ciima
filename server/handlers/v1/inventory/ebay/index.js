//const queryString = require("query-string");
const inventoryDirector = require("../../../../../util/inventory/inventoryDirector");
const { format, subDays, addDays } = require("date-fns");

//action CONSTANTS
const { LOAD_EBAY } = require("../../../../../util/inventory/actions");

module.exports = fastify => ({
  loadInventoryHandler: async (req, res) => {
    const { startDate, endDate } = req.body;
    //Setup our dateParams, get these from body later
    let dteStart = new Date(startDate).toISOString();
    let dteEnd = new Date(endDate).toISOString();

    //call our inventory function
    const loadInventoryResults = await inventoryDirector(LOAD_EBAY, {
      startDate: dteStart,
      endDate: dteEnd
    });

    //return the resuts
    return { results: loadInventoryResults };
  }
});
