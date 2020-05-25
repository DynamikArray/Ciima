const { linnworks } = require("../linnworks.js");

/**
 * executeCustomScriptQuery should execute a custom query from linnwors dashboards
 * @param  String  sqlQuery correcttly formatted string for a query in linnworks
 *                 these can be built in their app, and used as value here
 * @return {Promise}          [description]
 */
const executeCustomScriptQuery = async sqlQuery => {
  try {
    const data = sqlQuery;

    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Dashboards/ExecuteCustomScriptQuery",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data
    });

    if (result) return { result };
    if (error) return { error };
  } catch (error) {
    linnworks.logger.error(error);
    return { customQueryError: error };
  }
};

module.exports = executeCustomScriptQuery;
