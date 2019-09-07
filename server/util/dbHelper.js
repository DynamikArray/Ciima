/**
 * [exports description]
 * @param  {FastifyInstance} fastify Fastify Instace
 * @return {Object}         Results object of Rows, Fields
 */
module.exports = fastify => ({
  query: async function(query) {
    const connection = await fastify.mysql.getConnection();
    const [rows, fields] = await connection.query(query);
    connection.release();
    return { rows, fields };
  }
});
