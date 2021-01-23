const {
  CREATE_ITEM_EXTENDED_PROPERTIES,
  UPDATE_ITEM_EXTENDED_PROPERTIES,
} = require("../../../../../util/auditLog/logActionTypes");
const { LINNWORKS } = require("../../../../../util/auditLog/logResourceTypes");

const getInventoryItemExtendedProperties = require("../../../../../util/linnworks/helpers/getInventoryItemExtendedProperties");
const updateInventoryItemExtendedProperties = require("../../../../../util/linnworks/helpers/updateInventoryItemExtendedProperties");

module.exports = (fastify) => ({
  updateExtendedPropertiesHandler: async (req, res) => {
    let _result,
      _error = false;

    const { fkStockItemId, ProperyName, PropertyValue } = req.body;

    try {
      const { getPropsResult, getPropsError } = await getInventoryItemExtendedProperties(fkStockItemId);

      if (getPropsResult) {
        const propToUpdate = getPropsResult.filter((prop) => prop.ProperyName == ProperyName);
        propToUpdate[0].PropertyValue = PropertyValue;
        const { result, error } = await updateInventoryItemExtendedProperties(propToUpdate, fkStockItemId);

        if (result) {
          _result = result;
          return { result, error: false };
        }

        if (error) {
          _error = error;
          return { error, result: false };
        }
      }
      return { error: "No extended property found" };
    } catch (e) {
      fastify.winston.error(e);
    } finally {
      fastify.auditLogger.log(
        UPDATE_ITEM_EXTENDED_PROPERTIES,
        -1,
        fkStockItemId,
        LINNWORKS,
        JSON.stringify({
          _result,
          _error,
        })
      );
    }
  },
});
