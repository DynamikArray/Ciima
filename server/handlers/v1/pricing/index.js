const pric

module.exports = fastify => ({
  pricingHandler: async (req, reply) => {
    const { searchType, searchString } = req.body;


    return { result: { ...req.body } };
  }
});
