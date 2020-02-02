//Director
const inventoryDirector = require("../../util/inventory/inventoryDirector");

//action CONSTANTS
const { LOAD_LINNWORKS } = require("../../util/inventory/actions");

//const { logger } = require("../util/winston/winston.js");
const logger = require("../../util/winston/winston.js")({
  hostname: "Worker"
});

const fetchLinnworksInventory = async () => {
  const payload = false;
  const loadInventoryResults = await inventoryDirector(LOAD_LINNWORKS, payload);

  logger.debug(
    `fetchLinnworksInventory()|${JSON.stringify(loadInventoryResults)}`
  );
};

module.exports = { fetchLinnworksInventory };
