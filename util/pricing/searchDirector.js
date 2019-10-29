//SEARCH TYPES ---these need to be reused elsewhere maybe ??
const EBAY_ENDED = "ebayEnded";
const EBAY_ACTIVE = "ebayActive";
const MYCOMICSHOP = "myComicShop";

const ebayWebsiteStrategy = require("./websiteStrategies/ebayWebsiteStrategy");
const mycomicshopWebsiteStrategy = require("./websiteStrategies/mycomicshopWebsiteStrategy");

function priceSearcher(websiteStrategy) {
  this.searchStrategy = websiteStrategy;

  this.search = async searchString => {
    return await this.searchStrategy.search(searchString);
  };
}

//Main search method
async function searchDirector(searchString, searchType) {
  let websiteStrategy = false;

  switch (searchType) {
    case EBAY_ENDED:
      websiteStrategy = new ebayWebsiteStrategy("findCompletedItems");
      break;
    case EBAY_ACTIVE:
      websiteStrategy = new ebayWebsiteStrategy("findItemsAdvanced");
      break;
    case MYCOMICSHOP:
      websiteStrategy = new mycomicshopWebsiteStrategy();
      break;
  }
  //instiate our pricesearcher
  const searcher = new priceSearcher(websiteStrategy);
  const result = await searcher.search(searchString);
  return result;
}

module.exports = searchDirector;
