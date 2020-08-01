const { buildSelectQueries, buildSelectQueriesParams } = require("./helper");

const logActionTypes = require("../../../../util/auditLog/logActionTypes");

module.exports = (fastify) => ({
  /**
   * [searchHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  searchHandler: async (req, res) => {
    let { resourceType, actionType, userId } = req.query;
    if (!resourceType || resourceType == "ALL") resourceType = ""; //default to open if no param
    if (!actionType || actionType == "ALL") actionType = "";
    if (!userId || userId == "ALL") userId = "";

    const page = Number(req.query.page) || 1;
    const pageLimit = Number(req.query.limit) || 5; //Limit to 500 by default, and let client handle filtering

    const { selectQuery, totalQuery } = buildSelectQueries();
    const { selectParams, totalParams } = buildSelectQueriesParams(
      page - 1,
      pageLimit,
      resourceType,
      actionType,
      userId
      //searchString
    );

    try {
      const [rows, fields] = await fastify.mysql.query(
        selectQuery,
        selectParams
      );
      const [totalRows] = await fastify.mysql.query(totalQuery, totalParams);

      //PAGING totals
      const rowsTotal = totalRows[0].rowCount;

      const pageCount = Math.ceil(rowsTotal / pageLimit);

      return { result: { page, pageCount, pageLimit, rowsTotal, rows } };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },

  /**
   * [userListHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  userListHandler: async (req, res) => {
    const userListQuery =
      "SELECT u.id as value, u.displayName as text, u.displaycolor as color FROM slc_users u ORDER BY displayName ASC";
    try {
      const [rows, fields] = await fastify.mysql.query(userListQuery);
      return { result: rows };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },

  /**
   * [actionListHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  actionListHandler: async (req, res) => {
    const items = Object.keys(logActionTypes).map((key) => {
      return { text: key, value: logActionTypes[key] };
    });
    return { result: items };
  },
});
