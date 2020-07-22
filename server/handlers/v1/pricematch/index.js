const {
  buildSelectQueries,
  buildSelectQueriesParams,
} = require("../../../../util/pricematch/searchOurIssues");

const {
  searchOurIssues,
  searchWebRetailerTitles,
  searchWebRetailerIssues,
  getPageOfWebRetailerIssues,
} = require("../../../../util/pricematch/PriceMatchHelper");

module.exports = (fastify) => ({
  /**
   * [searchTheirTitlesHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  searchTheirTitlesHandler: async (req, res) => {
    const { query } = req.query;

    const { result, error } = await searchWebRetailerTitles(query);

    if (result && !error) return { result };
    if (error && !result) return { error };
  },

  /**
   *
   *
   */
  searchOurIssuesHandler: async (req, res) => {
    const { title } = req.query;
    const page = Number(req.query.page) || 1;
    const pageLimit = Number(req.query.limit) || 50;

    const { selectQuery, totalQuery } = buildSelectQueries();
    const { selectParams, totalParams } = buildSelectQueriesParams(
      page - 1,
      pageLimit,
      title
    );
    try {
      const [rows, fields] = await fastify.mysql.query(
        selectQuery,
        selectParams
      );
      const [totalRows] = await fastify.mysql.query(totalQuery, totalParams);
      const rowsTotal = totalRows[0].rowCount;
      const pageCount = Math.ceil(rowsTotal / pageLimit);

      return {
        result: { rows, pager: { page, pageCount, pageLimit, rowsTotal } },
      };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },

  /**
   * [searchTheirIssuesHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  searchTheirIssuesHandler: async (req, res) => {
    const { TID } = req.query;

    const { result, error } = await searchWebRetailerIssues(TID);

    if (result && !error) return { result };
    if (error && !result) return { error };
  },

  /**
   * [getPageTheirIssuesHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  getPageTheirIssuesHandler: async (req, res) => {
    const { tid, pgi } = req.query;

    const { result, error } = await getPageOfWebRetailerIssues({ tid, pgi });

    if (result && !error) return { result };
    if (error && !result) return { error };
  },
});
