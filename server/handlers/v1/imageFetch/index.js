const request = require("request");
const fs = require("fs");

/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
const imageFetch = async (req, res) => {
  const resp = await request(req.query.url);

  // TODO: should this be a stream or pipe or something like that
  res.send(resp);
};
module.exports = { imageFetch };
