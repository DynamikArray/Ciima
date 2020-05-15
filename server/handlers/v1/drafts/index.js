//Pull In our Query Helpers
const { buildSelectQueries, buildSelectQueriesParams } = require("./helper");

/**
 * [exports description]
 * @param  {FastifyObject} fastify the fastify isntance
 * @return {object}         object containing the apporiate handlers for the drafts route
 */
module.exports = fastify => ({
  readHandler: async (req, res) => {
    let { status, all, draftType, searchString } = req.query;
    if (!status) status = "open"; //default to open if no param
    if (!draftType) draftType = "";
    if (!searchString) searchString = "";

    const page = Number(req.query.page) || 1;
    const pageLimit = Number(req.query.limit) || 5; //Limit to 500 by default, and let client handle filtering

    const { selectQuery, totalQuery } = buildSelectQueries();
    const { selectParams, totalParams } = buildSelectQueriesParams(
      page - 1,
      pageLimit,
      status,
      draftType,
      searchString
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
  }
});
