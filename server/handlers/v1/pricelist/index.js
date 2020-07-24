const {
  buildSelectQueries,
  buildSelectQueriesParams,
} = require("../../../../util/pricelist/searchPricelist");

const {
  buildReadPricelistQuery,
} = require("../../../../util/pricelist/readPricelist");

module.exports = (fastify) => ({
  /**
   * [searchTheirTitlesHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  searchPricelistHandler: async (req, res) => {
    const searchString = req.body.searchString || "";
    const page = Number(req.body.page) || 1;
    const pageLimit = Number(req.body.limit) || 50;

    const { selectQuery, totalQuery } = buildSelectQueries();
    const { selectParams, totalParams } = buildSelectQueriesParams(
      page - 1,
      pageLimit,
      searchString
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
   * [readPricelistHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  readPricelistHandler: async (req, res) => {
    const id = req.params.slc_IssueId;
    const query = buildReadPricelistQuery();

    try {
      const [rows, fields] = await fastify.mysql.query(query, id);
      if (rows.length !== 1) {
        res.send({ error: "Record not found" });
      }

      return { result: rows[0] };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },
});
