/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
module.exports = fastify => ({
  keepAliveHandler: async (req, res) => {
    const { serverUrl, sessionToken } = fastify.linnworks;

    let server,
      token = false;

    if (serverUrl) server = serverUrl;
    if (sessionToken) token = true;

    return {
      api: true,
      linnworks: { server, token }
    };
  }
});
