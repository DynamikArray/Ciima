const adjustTemplatesInstant = require("../../../../../util/linnworks/helpers/adjustTemplatesInstant");

module.exports = (fastify) => ({
  updateTemplateInstantHandler: async (req, res) => {
    const { pkStockItemId } = req.body;

    const { adjustResult, adjustError } = await adjustTemplatesInstant(pkStockItemId);
    if (adjustError) return { adjustError };
    if (adjustResult) {
      return { result: adjustResult };
    } else {
      return {
        error: {
          message: "Cant update this items listing templates.  Unable to adjustTemplatesInstart",
        },
      };
    }
  },
});
