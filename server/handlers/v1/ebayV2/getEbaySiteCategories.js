const { baseURLS } = require("../../../plugins/EbayClient/EbayClientConfig");

module.exports = (fastify) => ({
  getEbaySiteCategories: async (req, reply) => {
    const CATEGORY_TREE_0 = `${baseURLS.taxonomy}category_tree/0`;
    const FORMATTED_CATEGORIES = [];

    let url = CATEGORY_TREE_0;
    if (req.query && req.query.category_id) {
      url = `${CATEGORY_TREE_0}/get_category_subtree?category_id=${req.query.category_id}`;
    }
    const { status, data } = await fastify.ebayClient.axiosInstance.get(url);

    //ROOT - Only applies to root categories  - when no caegory_id passed in
    if (data && data.rootCategoryNode && data.rootCategoryNode.childCategoryTreeNodes) {
      data.rootCategoryNode.childCategoryTreeNodes.forEach((node, index) => {
        FORMATTED_CATEGORIES.push({
          CategoryID: node.category.categoryId,
          CategoryName: node.category.categoryName,
          CategoryLevel: node.categoryTreeNodeLevel,
          LeafCategory: node.leafCategoryTreeNode,
        });
      });
    }

    //BRANCHES - When there is a categoryId supplied it needs this logic
    if (data && data.categorySubtreeNode && data.categorySubtreeNode.childCategoryTreeNodes) {
      data.categorySubtreeNode.childCategoryTreeNodes.forEach((node, index) => {
        FORMATTED_CATEGORIES.push({
          CategoryID: node.category.categoryId,
          CategoryName: node.category.categoryName,
          CategoryLevel: node.categoryTreeNodeLevel,
          LeafCategory: node.leafCategoryTreeNode,
        });
      });
    }

    //LEAFS - When there is a categoryId supplied it needs this logic
    if (data && data.categorySubtreeNode && data.categorySubtreeNode.leafCategoryTreeNode == true) {
      let node = data.categorySubtreeNode;
      FORMATTED_CATEGORIES.push({
        CategoryID: node.category.categoryId,
        CategoryName: node.category.categoryName,
        CategoryLevel: node.categoryTreeNodeLevel,
        LeafCategory: node.leafCategoryTreeNode,
      });
    }

    return { result: FORMATTED_CATEGORIES };
  },
});
