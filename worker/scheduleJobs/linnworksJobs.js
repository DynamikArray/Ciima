//Director
const inventoryDirector = require("../../util/inventory/inventoryDirector");

//action CONSTANTS
const { LOAD_LINNWORKS } = require("../../util/inventory/actions");

//const { logger } = require("../util/winston/winston.js");
const logger = require("../../util/winston/winston.js")({
  hostname: "Worker",
});

const fetchLinnworksInventory = async () => {
  logger.info(`START fetchLinnworksInventory()`);

  const payload = false;
  const loadInventoryResults = await inventoryDirector(LOAD_LINNWORKS, payload);

  logger.info(
    `END fetchLinnworksInventory()|${JSON.stringify(loadInventoryResults)}`
  );
};

module.exports = { fetchLinnworksInventory };
