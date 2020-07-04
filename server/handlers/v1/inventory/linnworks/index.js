const queryString = require("query-string");
const StockItemsBuilder = require("../../../../../util/linnworks/StockItemsBuilder");

const {
  UPDATE_ITEM_FIELD,
  UPDATE_LOCATION_FIELD,
} = require("../../../../../util/auditLog/logActionTypes");
const { LINNWORKS } = require("../../../../../util/auditLog/logResourceTypes");

module.exports = (fastify) => ({
  /**
   * [searchInventoryHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  searchInventoryHandler: async (req, res) => {
    const keyword = req.body.searchString;
    try {
      //hold some things
      let perPage = 200;
      let pageNumber = 1;
      let nextPage = true;

      //stock item builder/formatter/container
      const stockItemsBuilder = new StockItemsBuilder();

      while (nextPage === true) {
        const formattedData = `keyword=${keyword}&loadCompositeParents=true&loadVariationParents=true&entriesPerPage=${perPage}&pageNumber=${pageNumber}&dataRequirements=[0,2,4,5,6,7,8]&searchTypes=[0,1,2]`;
        const { result, error } = await fastify.linnworks.makeApiCall({
          method: "POST",
          url: "Stock/GetStockItemsFull",
          headers:
            "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
          data: formattedData,
        });

        if (error) nextPage = false;
        if (result) {
          if (result.length < perPage) nextPage = false;
          stockItemsBuilder.addResults(result);
        }
        pageNumber++;
      }

      //we need to massage these into a formatted Inventory record, filtering out the
      return { result: stockItemsBuilder.getResults(), error: false };
    } catch (error) {
      console.log(error);
      fastify.winston.error(error);
    }
  },

  /**
   * [updateLocationOrQuantityHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  updateLocationOrQuantityHandler: async (req, res) => {
    const {
      changeSource,
      fieldName,
      fieldValue,
      inventoryItemId,
      locationId,
    } = req.body;

    const formattedData = `inventoryItemId=${inventoryItemId}&fieldName=${fieldName}&fieldValue=${fieldValue}&locationId=${locationId}&changeSource=${changeSource}`;

    try {
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Inventory/UpdateInventoryItemLocationField",
        headers:
          "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: formattedData,
      });
      if (result) return { result };
      if (error) return { error };
    } catch (error) {
      fastify.winston.error(error);
    } finally {
      fastify.auditLogger.log(
        UPDATE_LOCATION_FIELD,
        req.user.id,
        inventoryItemId,
        LINNWORKS,
        JSON.stringify({ fieldName, fieldValue })
      );
    }
  },

  /**
   * [updateLocationOrQuantityHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  updateItemFieldHandler: async (req, res) => {
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

      if (result) return { result };
      if (error) return { error };
    } catch (error) {
      fastify.winston.error(error);
    } finally {
      fastify.auditLogger.log(
        UPDATE_ITEM_FIELD,
        req.user.id,
        inventoryItemId,
        LINNWORKS,
        JSON.stringify({ fieldName, fieldValue })
      );
    }
  },
});
