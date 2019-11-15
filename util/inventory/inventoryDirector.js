const { LOAD_EBAY } = require("./actions");
const ebayInventoryStrategy = require("./websiteStrategies/ebayInventoryStrategy");

function loadHandler(websiteStrategy) {
  this.loadStrategy = websiteStrategy;
  this.load = async (payload = false) => {
    return await this.loadStrategy.load(payload);
  };
}

async function inventoryDirector(action, payload = false) {
  switch (action) {
    case LOAD_EBAY:
      const siteStrat = new ebayInventoryStrategy(LOAD_EBAY);
      const loader = new loadHandler(siteStrat);
      const result = await loader.load(payload);
      return result;
      break;
    default:
      console.log("NO ACTION FOUND\n");
      break;
  }
}

module.exports = inventoryDirector;
