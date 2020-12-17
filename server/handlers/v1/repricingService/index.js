const { REPRICE_ITEM } = require("../../../../util/amqp/queueActionsList.js");
const {
  getRepricingItemsList,
} = require("../../../../util/linnworks/queries/repricer/lots/getRepricingItemsList.js");

const { buildSelectQueries, buildSelectQueriesParams } = require("./helper");

module.exports = (fastify) => ({
  /**
   * [getItemsListHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  getItemsListHandler: async (req, res) => {
    try {
      //send whatever params are required for the query to be built?
      const { repricedItems } = req.body;
      const data = getRepricingItemsList(repricedItems);

      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });

      if (result && !result.IsError) {
        return { result: result.Results, total: result.TotalResults };
      }

      if (error) return { error: error };
    } catch (e) {
      throw e;
    }
  },

  /**
   * [repriceItemByIdHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  repriceItemByIdHandler: async (req, res) => {
    const { rabbit, winston } = fastify;
    const amqp = require("../../../util/amqpMsgHelper.js")(rabbit, winston);
    const { pkStockItemID, ItemTitle } = req.body;

    const payload = JSON.stringify({
      action: REPRICE_ITEM,
      data: { pkStockItemID, ItemTitle },
    });

    try {
      const result = await amqp.sendMessage(payload);
      fastify.winston.debug(JSON.stringify(result));

      return result;
    } catch (e) {
      throw e;
    }
  },

  /**
   * [getRepricingLogHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  getRepricingLogHandler: async (req, res) => {
    const page = Number(req.body.page) || 1;
    const pageLimit = Number(req.body.limit) || 10;

    const { selectQuery, totalQuery } = buildSelectQueries();
    const { selectParams, totalParams } = buildSelectQueriesParams(
      page - 1,
      pageLimit
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
