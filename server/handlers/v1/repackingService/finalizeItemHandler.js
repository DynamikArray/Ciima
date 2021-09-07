const { LINNWORKS } = require("../../../../util/auditLog/logResourceTypes");
const { FINALIZE_FOR_REPACKING } = require("../../../../util/auditLog/logActionTypes");
const { repackFlags } = require("../../../../server/config/appConstants").repackingService;
const getInventoryItemExtendedProperties = require("../../../../util/linnworks/helpers/getInventoryItemExtendedProperties");
const updateInventoryItemExtendedProperties = require("../../../../util/linnworks/helpers/updateInventoryItemExtendedProperties");

module.exports = (fastify) => {
  const { addExtendedProperty } = require("./_helpers")(fastify);

  async function addCompletedFlag(pkStockItemId, sku, userId) {
    return await addExtendedProperty(repackFlags.completed, 1, pkStockItemId, sku, userId);
  }

  async function addCompletedDateFlag(pkStockItemId, sku, userId) {
    return await addExtendedProperty(repackFlags.completedDate, new Date(), pkStockItemId, sku, userId);
  }

  const finalizeItemHandler = async (req, res) => {
    try {
      const { pkStockItemId, sku } = req.body;
      const { getPropsResult, getPropsError } = await getInventoryItemExtendedProperties(pkStockItemId);

      if (getPropsError) throw "getInventoryItemExtendedProperties had an error: " + error;

      //DOES our extended property exist, if yes, update it
      const filteredProp = getPropsResult.filter((prop) => prop.ProperyName == repackFlags.pending);

      if (filteredProp.length != 1 || filteredProp[0].PropertyValue != 1) {
        return { error: "Couldnt Find correct Extended Property, have admin check logs." };
      }

      //update prop value to 0 and update value in linnworks
      const updatedProp = { ...filteredProp[0], PropertyValue: 0 };
      const { result, error } = await updateInventoryItemExtendedProperties([updatedProp], pkStockItemId, req.user.id);
      if (!result && error) return { error };

      //Add our new extended properties
      const completedFlagRes = await addCompletedFlag(pkStockItemId, sku, req.user.id);
      if (!completedFlagRes) return { error: "Add Completed Flag Failed, have admin check logs." };

      const completedDateFlagRes = await addCompletedDateFlag(pkStockItemId, sku, req.user.id);
      if (!completedDateFlagRes) return { error: "Add Completed Date Flag Failed, have admin check logs." };

      //Audit Log submit_for_repacking
      fastify.auditLogger.log(
        FINALIZE_FOR_REPACKING,
        req.user.id,
        pkStockItemId,
        LINNWORKS,
        JSON.stringify({ pkStockItemId, sku })
      );
      //
      return { result: "Success! Item Finalized For Repacking" };
    } catch (e) {
      throw e;
    }
  };

  return { finalizeItemHandler };
};
