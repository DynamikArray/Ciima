const {
  buildNewItemsQuery,
  buildExistingItemsQuery,
} = require("../../../../util/ciima/queries/analytics");

module.exports = (fastify) => ({
  analyticsSearchHandler: async (req, reply) => {
    //query params
    const days = req.query.days || 0; //default to today only

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

    const [newItems] = await fastify.mysql.query(
      newItemsSqlOpts.query,
      newItemsSqlOpts.params
    );

    const [existingItems] = await fastify.mysql.query(
      existingItemsSqlOpts.query,
      existingItemsSqlOpts.params
    );

    return { result: { newItems, existingItems } };
  },
});
