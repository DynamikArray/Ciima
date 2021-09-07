const { LINNWORKS } = require("../../../../util/auditLog/logResourceTypes");
const { ZERO_OUT_INVENTORY, ADD_EXTENDED_PROPERTY_FLAG } = require("../../../../util/auditLog/logActionTypes");

module.exports = (fastify) => {
  /**
   * ZeroOutItem - helper function to handle zeroing out item
   * @param       {[type]} pkStockItemId [this should be the pkStockItemId]
   * @param       {[type]} userId          [ciima user id]
   * @constructor
   */
  async function zeroOutItem(pkStockItemId, userId) {
    const locationId = "00000000-0000-0000-0000-000000000000";
    const enumField = 10;
    const formattedData = `inventoryItemId=${pkStockItemId}&fieldName=${enumField}&fieldValue=0&locationId=${locationId}&changeSource=0`;
    let _success,
      _error = false;

    try {
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: `Inventory/UpdateInventoryItemLocationField`,
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: formattedData,
      });

      if (result && !error) {
        _success = result;
        return true;
      }
    } catch (e) {
      _error = e;
      return false;
    } finally {
      let status = {};

      if (!_success && _error) {
        status = { error: _error };
        fastify.linnworks.logger.error("zeroOutItem error:" + _error);
      }

      if (_success && !_error) {
        status = { success: _success };
      }

      fastify.auditLogger.log(ZERO_OUT_INVENTORY, userId, pkStockItemId, LINNWORKS, JSON.stringify(status));
    }
  }

  /**
   * [addExtendedProperty description]
   * @param {[type]} propertyName  [description]
   * @param {[type]} pkStockItemId [description]
   * @param {[type]} sku           [description]
   * @param {[type]} userId        [description]
   */
  async function addExtendedProperty(propertyName, propertyValue, pkStockItemId, sku, userId) {
    let _error,
      _success = false;

    //create extended property payload
    const extendedProperty = [
      {
        fkStockItemId: pkStockItemId,
        SKU: sku,
        ProperyName: propertyName,
        PropertyValue: propertyValue,
        PropertyType: "Attribute",
      },
    ];

    try {
      //CreateInventoryItemExtendedProperties
      const { result, error } = await fastify.linnworks.makeApiCall({
        method: "POST",
        url: "Inventory/CreateInventoryItemExtendedProperties",
        headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
        data: `inventoryItemExtendedProperties=${JSON.stringify(extendedProperty)}`,
      });

      if (!result && error) {
        _error = error;
        return false;
      }

      if (result && !error) {
        _success = result;
        return true;
      }
    } catch (e) {
      _error = e;
      return false;
    } finally {
      let status = {};

      if (!_success && _error) {
        status = { error: _error };
        fastify.linnworks.logger.error(
          "addExtendedProperty propertyName=" + propertyName + " propertyValue=" + propertyValue + " error:" + _error
        );
      }

      if (_success && !_error) {
        status = { success: _success };
      }

      fastify.auditLogger.log(
        ADD_EXTENDED_PROPERTY_FLAG,
        userId,
        pkStockItemId,
        LINNWORKS,
        JSON.stringify([propertyName, propertyValue, status])
      );
    }
  }

  return { zeroOutItem, addExtendedProperty };
};
