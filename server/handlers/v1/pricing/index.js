const searchDirector = require("../../../../util/pricing/searchDirector");

module.exports = fastify => ({
  pricingHandler: async (req, reply) => {
    const { searchType, searchString } = req.body;
    const { result, error } = await searchDirector(searchString, searchType);
    if (result && !error) return { result };
    if (error && !result) return { error };
  }
});
