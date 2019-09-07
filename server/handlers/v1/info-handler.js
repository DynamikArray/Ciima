/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
const keepAlive = async () => {
  return "API is alive";
};
module.exports = { keepAlive };
