const {
  buildAnalyticsQuery,
} = require("../../../../util/ciima/queries/analytics");

module.exports = (fastify) => ({
  analyticsSearchHandler: async (req, reply) => {
    //query params
    const days = req.query.days || 30; //days of data for now

    //Userid Transformer
    let userId = ""; //days of data for now
    if (req.query.userId) {
      if (req.query.userId == "ALL") {
        userId = "";
      } else {
        userId = Number(req.query.userId);
      }
    }

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
