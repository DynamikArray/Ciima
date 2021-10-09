const { baseURLS } = require("../../../plugins/EbayClient/EbayClientConfig");

module.exports = (fastify) => ({
  getItemAspectsForCategory: async (req, reply) => {
    let categoryTreeId = req.query.ebaySitecategoryTreeId || 0;
    let categoryId = req.query.ebaySiteCategoryId;

    const url = `${baseURLS.taxonomy}/category_tree/${categoryTreeId}/get_item_aspects_for_category?category_id=${categoryId}`;

    try {
      const { status, data } = await fastify.ebayClient.axiosInstance.get(url);

      let requiredAspects = [];
      let optionalAspects = [];

      if (data.aspects) {
        data.aspects.forEach((aspect) => {
          if (aspect.aspectConstraint.aspectRequired == true) requiredAspects.push(aspect);
          //if (aspect.aspectConstraint.aspectRequired == false) optionalAspects.push(aspect);
        });
      }

      return { result: { requiredAspects, optionalAspects } };
    } catch (e) {
      console.log(e);
    }
  },
});
