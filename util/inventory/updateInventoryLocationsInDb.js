const mysqlConnPool = require("../mysql/mysqlConnPool");

//include logger
const logger = require("../winston/winston.js")({
  hostname: "Utility",
});

const updateInventoryLocationsInDb = async (values) => {
  values.forEach(async (item) => {
    let query = `UPDATE slc_inventory SET location = ?, quantity = ? where sku = ?`;
    const sku = item[0];
    const location = item[1];
    const quantity = item[2];
    try {
      const results = await mysqlConnPool.query(query, [location, quantity, sku]);
      if (results) return true;
    } catch (e) {
      logger.error(e);
      return false;
    }
  });
  return true;
};
module.exports = { updateInventoryLocationsInDb };
