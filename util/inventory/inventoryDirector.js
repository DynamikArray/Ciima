const { LOAD_EBAY, LOAD_LINNWORKS } = require("./actions");
const ebayInventoryStrategy = require("./websiteStrategies/ebayInventoryStrategy");
const linnworksInventoryStrategy = require("./websiteStrategies/linnworksInventoryStrategy");

function loadHandler(websiteStrategy) {
  this.loadStrategy = websiteStrategy;
  this.load = async (payload = false) => {
    return await this.loadStrategy.load(payload);
  };
}

async function inventoryDirector(action, payload = false) {
  switch (action) {
    case LOAD_EBAY:
      const ebayStrat = new ebayInventoryStrategy(LOAD_EBAY);
      const ebayLoader = new loadHandler(ebayStrat);
      const ebayResult = await ebayLoader.load(payload);
      return { result: ebayResult };
      break;
    case LOAD_LINNWORKS:
      const linnworksStrat = new linnworksInventoryStrategy(LOAD_LINNWORKS);
      const linnworksLoader = new loadHandler(linnworksStrat);
      const linnworksResult = await linnworksLoader.load(payload);
      return { result: linnworksResult };
      break;
    default:
      console.log("NO ACTION FOUND\n");
      break;
  }
}

module.exports = inventoryDirector;
