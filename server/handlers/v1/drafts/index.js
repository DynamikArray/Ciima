//Pull In our Query Helpers
const { buildSelectQueries, buildSelectQueriesParams } = require("./helper");

/**
 * [exports description]
 * @param  {FastifyObject} fastify the fastify isntance
 * @return {object}         object containing the apporiate handlers for the drafts route
 */
module.exports = (fastify) => ({
  readHandler: async (req, res) => {
    const createdDate = req.query.createdDate || "";
    const titleString = req.query.searchString || "";
    const locationString = req.query.searchString || "";
    const status = req.query.status || "open"; //default to open if no param
    const draftType = req.query.draftType || "";

    const page = Number(req.query.page) || 1;
    const pageLimit = Number(req.query.limit) || 5; //Limit to 500 by default, and let client handle filtering

    const { selectQuery, totalQuery } = buildSelectQueries();
    const { selectParams, totalParams } = buildSelectQueriesParams(
      page - 1,
      pageLimit,
      status,
      draftType,
      titleString,
      locationString,
      createdDate
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
});
