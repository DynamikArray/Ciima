//include linnworks utilities
const { linnworks } = require("../../linnworks/linnworks.js");
//include logger
const logger = require("../../winston/winston.js")({
  hostname: "Utility",
});

const {
  locationsSql,
} = require("../../linnworks/queries/inventory/LocationQueries");
const {
  updateInventoryLocationsInDb,
} = require("../updateInventoryLocationsInDb");

//Main
function linnworksInventoryStrategy(action) {
  //
  //
  const fetchInventoryPage = async (pageNumber, perPage) => {
    const data = locationsSql(pageNumber, perPage);

    try {
      const { result, error } = await linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });

      if (result) return { result };
      if (error) return { error };
    } catch (error) {
      logger.error(error);
    }
  };

  const saveInventoryPage = async (results) => {
    logger.info("saveInventoryPage()");
    const valuesOnly = results.map((item) => {
      return Object.values(item);
    });
    const updateResult = await updateInventoryLocationsInDb(valuesOnly);
    return updateResult;
    //execute mysql
  };

  const load = async (payload = false) => {
    logger.info("START linnworksStrategy - load()");

    //we dont use payload yet
    let pageNumber = 1;
    let perPage = 500;
    let more = true;

    while (more === true) {
      const fetchedPage = await fetchInventoryPage(pageNumber, perPage);

      if (fetchedPage.result) {
        const { TotalResults } = fetchedPage.result;
        //send these results off for processing and saving
        const saved = await saveInventoryPage(fetchedPage.result.Results);
        //
        if (TotalResults == perPage) {
          pageNumber++;
        } else {
          more = false;
        }
      } else {
        more = false;
      }
    }
    logger.info("END linnworksStrategy - load()");
    return true;
  }; //end load function

  return { load };
}

module.exports = linnworksInventoryStrategy;
