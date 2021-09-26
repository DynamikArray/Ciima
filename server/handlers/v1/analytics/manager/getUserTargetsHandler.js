module.exports = (fastify) => ({
  getUserTargetsHandler: async (req, reply) => {
    const { startDate, endDate } = req.query;
    const query = `SELECT t.id,
      t.userId,
      u.displayname as userName,
      t.startDate,
      t.endDate,
      t.targetValue
    FROM
  	 slc_user_targets  t
  	LEFT JOIN slc_users u ON u.id = t.userId
    WHERE startDate = ? and endDate = ?;`;

    let successResult,
      errorResult = false;
    try {
      const [rows, fields] = await fastify.mysql.query(query, [startDate, endDate]);
      successResult = rows;
      return { result: rows };
    } catch (error) {
      errorResult = error;
      fastify.winston.error(error);
      reply.send(error);
    } finally {
    }
  },
});
