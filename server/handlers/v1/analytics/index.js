const {
  buildNewItemsQuery,
  buildExistingItemsQuery,
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
    const newItemsSqlOpts = buildNewItemsQuery(days, userId);
    const existingItemsSqlOpts = buildExistingItemsQuery(days, userId);

    //sql execution
    const connection = await fastify.mysql.getConnection();
    if (connection) {
      const [newItems] = await connection.query(
        newItemsSqlOpts.query,
        newItemsSqlOpts.params
      );

      const [existingItems] = await connection.query(
        existingItemsSqlOpts.query,
        existingItemsSqlOpts.params
      );

      connection.release();

      return { result: { newItems, existingItems } };
    }
    return { error: "No Connection" };
  },
});
