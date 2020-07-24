const {
  buildSelectQueries,
  buildSelectQueriesParams,
} = require("../../../../util/pricematch/searchOurIssues");

const {
  queryCreateIssueMatch,
  queryUpdateIssueMatch,
  queryDeleteIssueMatch,
} = require("../../../../util/pricematch/CRUDIssueMatch");

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
    const { filterComicTypes, filterVariants, filterHasMatch } = req.query;

    const { selectQuery, totalQuery } = buildSelectQueries(
      filterComicTypes,
      filterVariants,
      filterHasMatch
    );
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

  /**
   * [createIssueMatchHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  createIssueMatchHandler: async (req, res) => {
    const params = req.body;
    const userId = req.user.id;
    const { result, error } = await queryCreateIssueMatch(
      fastify,
      userId,
      params
    );

    if (result && !error) return { result };
    if (error && !result) return { error };
  },

  /**
   * [updateIssueMatchHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  updateIssueMatchHandler: async (req, res) => {
    const params = req.body;
    const userId = req.user.id;

    const { result, error } = await queryUpdateIssueMatch(
      fastify,
      userId,
      params
    );

    if (result && !error) return { result };
    if (error && !result) return { error };
  },

  /**
   * [deleteIssueMatchHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  deleteIssueMatchHandler: async (req, res) => {
    const id = req.params.slc_IssueId;
    const userId = req.user.id;

    const { result, error } = await queryDeleteIssueMatch(fastify, userId, id);

    if (result && !error) return { result };
    if (error && !result) return { error };
  },
});
