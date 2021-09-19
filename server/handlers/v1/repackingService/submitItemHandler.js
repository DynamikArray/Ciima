const { LINNWORKS } = require("../../../../util/auditLog/logResourceTypes");
const { SUBMIT_FOR_REPACKING } = require("../../../../util/auditLog/logActionTypes");
const { repackFlags } = require("../../../../server/config/appConstants").repackingService;

module.exports = (fastify) => {
  const { zeroOutItem, addExtendedProperty } = require("./_helpers")(fastify);
  /**
   * [getItemsListHandler description]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  const submitItemHandler = async (req, res) => {
    try {
      //Zero Out Item Qty
      const { pkStockItemId, sku } = req.body;
      const zeroOutResponse = await zeroOutItem(pkStockItemId, req.user.id);
      if (!zeroOutResponse) return { error: "Zero Out Failed, have admin check logs." };

      //Update Extended Properties  (Check, Add, Update)
      const repackPendingFlagResponse = await addExtendedProperty(repackFlags.pending, 1, pkStockItemId, sku, req.user.id);
      if (!repackPendingFlagResponse) return { error: "Add Repacking Flag Failed, have admin check logs." };

      //Audit Log submit_for_repacking
      fastify.auditLogger.log(
        SUBMIT_FOR_REPACKING,
        req.user.id,
        pkStockItemId,
        LINNWORKS,
        JSON.stringify({ pkStockItemId, sku })
      );

      //return our suceess
      if (zeroOutResponse && repackPendingFlagResponse) {
        return { result: "Success! Item Flagged For Repacking" };
      }
    } catch (e) {
      throw e;
    }
  };

  return { submitItemHandler };
};
