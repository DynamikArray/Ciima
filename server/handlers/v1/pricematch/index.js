const {
  searchWebRetailerTitles,
  searchWebRetailerIssues,
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
});