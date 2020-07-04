const {
  buildAnalyticsQuery,
} = require("../../../../util/ciima/queries/analytics");

module.exports = (fastify) => ({
  analyticsSearchHandler: async (req, reply) => {
    //query params
    const days = req.query.days || 30; //days of data for now
    const userId = req.query.userId || ""; //days of data for now

    //sql creation
    const sqlOpts = buildAnalyticsQuery(days, userId);
    //sql execution
    const connection = await fastify.mysql.getConnection();
    if (connection) {
      const [rows, fields] = await connection.query(
        sqlOpts.query,
        sqlOpts.params
      );
      connection.release();
      return { result: rows };
    }
    return { error: "No Connection" };
  },
});
