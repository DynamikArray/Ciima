const selectLastTemplatesUpdate = require("../../../../../util/linnworks/queries/templateUpdates/selectLastTemplatesUpdate");
const countLastTemplatesUpdate = require("../../../../../util/linnworks/queries/templateUpdates/countLastTemplatesUpdate");

module.exports = (fastify) => ({
  updateTemplatesBatchHandler: async (req, res) => {
    async function getCount(
      categoryName,
      extPropValue = false,
      listingStatus = false
    ) {
      const data = countLastTemplatesUpdate(
        categoryName,
        extPropValue,
        listingStatus
      );

      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });
      if (!result.IsError) return { count: result.Results[0].templateCount };
      if (error) return { error: error };
    }

    async function getBatch(
      categoryName,
      extPropValue = false,
      listingStatus = false,
      batchSize = 100
    ) {
      const data = selectLastTemplatesUpdate(
        categoryName,
        extPropValue,
        listingStatus,
        batchSize
      );

      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Dashboards/ExecuteCustomScriptQuery",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data,
      });

      if (!result.IsError) return { results: result.Results };
      if (error) return { error: error };
    }

    const { categoryName, extPropValue, listingStatus, batchSize } = req.body;

    const remainingCount = await getCount(categoryName, extPropValue, false);

    const proccessedCount = await getCount(categoryName, "499_SHIPPING", false);

    const proccessingCount = await getCount(
      categoryName,
      extPropValue,
      "UPDATING"
    );

    const batchRows = await getBatch(
      categoryName,
      extPropValue,
      listingStatus,
      batchSize
    );

    return {
      result: {
        counts: { proccessedCount, remainingCount, proccessingCount },
        rows: batchRows.results,
      },
    };
  },
});
