module.exports = (fastify) => ({
  updateFieldHandler: async (req, res) => {
    const { fieldName, fieldValue, inventoryItemId } = req.body;
    const formattedData = `inventoryItemId=${inventoryItemId}&fieldName=${fieldName}&fieldValue=${fieldValue}`;
    try {
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Inventory/UpdateInventoryItemField",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: formattedData,
      });

      if (result && !error) return { result };
      if (error && !result) {
        localErrorHandler(error);
        return { error };
      }
    } catch (error) {
      localErrorHandler(error);
    } finally {
      fastify.auditLogger.log(
        UPDATE_ITEM_FIELD,
        req.user.id,
        inventoryItemId,
        LINNWORKS,
        JSON.stringify({ fieldName, fieldValue })
      );
    }

    function localErrorHandler(error) {
      fastify.winston.error(
        JSON.stringify({ method: "updateFieldHandler", error: error })
      );
    }
  },
});
