/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
module.exports = fastify => ({
  keepAliveHandler: async (req, res) => {
    const { linnworks } = fastify;

    let token = false;
    if (linnworks.sessionToken) token = true;

    return `API is alive | Linnworks Server Url: ${linnworks.serverUrl} | Linnworks Token Set: ${token}`;
  }
});
