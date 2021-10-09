const fp = require("fastify-plugin");
const EbayClient = require("./EbayClient");

module.exports = fp(async function (fastify, opts, done) {
  const auth = {
    clientID: process.env.EBAY_APP_ID,
    clientSecret: process.env.EBAY_CERT_ID,
  };

  fastify.decorate("ebayClient", new EbayClient(auth, fastify.winston));

  done();
});
