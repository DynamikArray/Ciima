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

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(
          selectQuery,
          selectParams
        );
        const [totalRows] = await connection.query(totalQuery, totalParams);

        //PAGING totals
        const rowsTotal = totalRows[0].rowCount;
        connection.release();

        const pageCount = Math.ceil(rowsTotal / pageLimit);

        return { result: { page, pageCount, pageLimit, rowsTotal, rows } };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
  },

  /**
   * [userListHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  userListHandler: async (req, res) => {
    const userListQuery =
      "SELECT u.id as value, u.username as text FROM slc_users u ORDER BY username ASC";

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(userListQuery);
        connection.release();
        return { result: rows };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
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
