const request = require("request");
const fs = require("fs");

/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
const imageFetch = async (req, res) => {
  //get our url property
  const url = req.query.url;
  const resp = await request(url);
  // TODO: should this be a stream or pipe or something like that
  res.send(resp);
};
module.exports = { imageFetch };
