const { format } = require("date-fns");
const { linnworks } = require("../../../util/linnworks/linnworks.js");

const LASTPRICED = "LastPriced";
const LASTPRICE = "LastPrice";

const getInventoryItemExtendedProperties = require("../../../util/linnworks/helpers/getInventoryItemExtendedProperties");
const createInventoryItemExtendedProperties = require("../../../util/linnworks/helpers/createInventoryItemExtendedProperties");
const updateInventoryItemExtendedProperties = require("../../../util/linnworks/helpers/updateInventoryItemExtendedProperties");

/**
 * [handleExtendedProperties description]
 * @param  {[type]}  pkStockItemID [description]
 * @param  {[type]}  newPrice      [description]
 * @return {Promise}               [description]
 */
const handleExtendedProperties = async (pkStockItemID, newPrice) => {
  try {
    //GetInventoryExtendedProperties
    const {
      getPropsResult,
      getPropsError,
    } = await getInventoryItemExtendedProperties(pkStockItemID);
    if (getPropsError)
      throw "getInventoryItemExtendedProperties had an error: " + error;

    //DOES our list of extended properties exists
    const filteredProps = getPropsResult.filter(
      (prop) => prop.ProperyName == LASTPRICED || prop.ProperyName == LASTPRICE
    );
    if (filteredProps.length == 0)
      return await createItemExtProps(pkStockItemID, newPrice);

    if (filteredProps.length > 0)
      return await updateItemExtProps(filteredProps, newPrice, pkStockItemID);
  } catch (e) {
    linnworks.logger.error(e);
    return false;
  } finally {
    //any cleanup/end code
  }
};

/**
 * [createItemExtProps description]
 * @param  {[type]}  pkStockItemID [description]
 * @param  {[type]}  newPrice      [description]
 * @return {Promise}               [description]
 */
const createItemExtProps = async (pkStockItemID, newPrice) => {
  const extProps = [
    {
      fkStockItemId: pkStockItemID,
      ProperyName: "LastPriced",
      PropertyValue: dateNowFormatted(),
      PropertyType: "Attritube",
    },
    {
      fkStockItemId: pkStockItemID,
      ProperyName: "LastPrice",
      PropertyValue: newPrice,
      PropertyType: "Attritube",
    },
  ];
  const { result, error } = await createInventoryItemExtendedProperties(
    extProps,
    pkStockItemID
  );
  if (result && !error) return true;
  if (!result && error) {
    linnworks.logger.error(error);
    return false;
  }
};

/**
 * [updateItemExtProps description]
 * @param  {[type]}  props    [description]
 * @param  {[type]}  newPrice [description]
 * @return {Promise}          [description]
 */
const updateItemExtProps = async (props, newPrice, pkStockItemID) => {
  try {
    props.forEach((prop) => {
      if (prop.ProperyName == LASTPRICE) prop.PropertyValue = newPrice;
      if (prop.ProperyName == LASTPRICED)
        prop.PropertyValue = dateNowFormatted();
    });
    const { result, error } = await updateInventoryItemExtendedProperties(
      props,
      pkStockItemID
    );

    if (result && !error) {
      return true;
    }

    if (!result && error) {
      linnworks.logger.error(error);
      return false;
    }
  } catch (e) {
    linnworks.logger.error(e);
    return false;
  } finally {
  }
};

/**
 * dateNowFormatted simple utility helper for formatting date the same
 * @return {[string]} Date string in the format we specified
 */
const dateNowFormatted = () => {
  return format(new Date(), "MM-dd-yyyy hh:mm:ss a");
};

module.exports = handleExtendedProperties;
