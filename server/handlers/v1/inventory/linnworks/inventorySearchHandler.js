const searchInventory = require("../../../../../util/linnworks/queries/inventory/searchInventory");

module.exports = (fastify) => ({
  searchHandler: async (req, res) => {
    const { searchTitle, searchCategories, searchLocation } = req.body;
    try {
      const data = searchInventory(
        searchTitle,
        searchCategories,
        searchLocation
      );

      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });

      if (!result.IsError)
        return { result: result.Results, total: result.TotalResults };
      if (error) return { error: error };
    } catch (error) {
      fastify.winston.error(error);
    }
  },
});
