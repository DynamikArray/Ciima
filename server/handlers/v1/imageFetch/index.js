const request = require("request");
const fs = require("fs");

/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
const imageFetch = async (req, res) => {
  const url = req.query.url;
  const resp = await request(url);
  res.send(resp);
};
module.exports = { imageFetch };
