const ebay = require("../../ebayAPI");
//include logger
const logger = require("../../winston/winston.js")({ hostname: "Server" });

/**
 * [titleChecker description]
 * @param  {[type]}  searchString [description]
 * @return {Promise}              [description]
 */
const titleChecker = async (searchString, fastify) => {
  const draftCheck = await checkTitleInDrafts(searchString, fastify);
  //there is a draft duplicate send response back
  if (draftCheck.result.failed == true) return draftCheck;
  //check and return ebay title check
  return await checkTitleOnEbay(searchString);
};

/**
 * checkTitleInDrafts checks against the drafts table for duplicate open drafts
 * @param  {string}  searchString title to check for
 * @param  {fastify}  fastify     fastify object for mysql
 * @return {Promise}              promise
 */
const checkTitleInDrafts = async (searchString, fastify) => {
  logger.debug(`Checking Title in Drafts for ${searchString}`);
  try {
    //build query
    const query =
      "SELECT * FROM slc_drafts WHERE inventoryTitle = ? AND STATUS = 'open' ";

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, searchString);
        connection.release();

        //if title found
        if (rows.length > 0)
          return { result: { passed: false, failed: true, items: rows[0] } };

        //no title found
        return { result: { passed: true, failed: false, items: false } };
      } catch (error) {
        logger.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

const checkTitleOnEbay = async searchString => {
  try {
    logger.debug(`Checking Title on ebay for ${searchString}`);

    const params = {
      keywords: [`"${searchString}"`],
      //categoryId: 63, //comics
      //outputSelector: ["SellerInfo", "AspectHistogram", "PictureURLLarge"],
      paginationInput: {
        entriesPerPage: 10
      }
      //sortOrder: "CurrentPriceHighest"
    };

    const { result } = await callEbay(params);

    if (result.searchResult && result.paginationOutput) {
      if (result.paginationOutput.totalEntries == 0) {
        return { result: { passed: true, failed: false, items: false } };
      }

      if (result.paginationOutput.totalEntries > 0) {
        return {
          result: { passed: false, failed: true, items: result.searchResult }
        };
      }
    }
  } catch (error) {
    logger.error(error);
    return { error };
  }
};

/**
 * [callEbay description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
const callEbay = params => {
  const { searchType } = this; //local instance of search type
  return new Promise(function(resolve, reject) {
    ebay.xmlRequest(
      {
        serviceName: "Finding",
        opType: "findItemsByKeywords",
        appId: process.env.EBAY_APP_ID,
        params: params,
        parser: ebay.parseResponseJson // (default)
      },
      (error, itemsResponse) => {
        if (error) reject(error);
        resolve({ result: itemsResponse });
      }
    );
  });
};

module.exports = { titleChecker };
