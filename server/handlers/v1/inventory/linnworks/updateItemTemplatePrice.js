const logger = require("../../../../../util/winston/winston.js")({
  hostname: "Server",
});

const getInventoryItemPrices = require("../../../../../util/linnworks/helpers/getInventoryItemPrices");
const updateInventoryItemPrices = require("../../../../../util/linnworks/helpers/updateInventoryItemPrices");
const adjustTemplatesInstant = require("../../../../../util/linnworks/helpers/adjustTemplatesInstant");

async function updateItemTemplatePrice(inventoryItemId, fieldValue) {
  const { pricesResult, pricesError } = await getInventoryItemPrices(
    inventoryItemId
  );
  if (pricesError) throw "getInventoryItemPrices() error:" + pricesError;
  if (pricesResult) {
    if (pricesResult > 1) {
      logger.error("Multiple prices found:", inventoryItemId, pricesResult);
    }
    const priceResult = pricesResult.shift();
    priceResult.Price = fieldValue;
    priceResult.UpdateStatus = 0;

    const { result, error } = await updateInventoryItemPrices(
      priceResult,
      inventoryItemId
    );

    if (!result && error) return { error: error };
    if (result && !error) {
      const { adjustResult, adjustError } = await adjustTemplatesInstant(
        inventoryItemId
      );
      if (adjustError) throw adjustError;
      if (adjustResult) {
        return { result: { RetailPrice: Number(fieldValue) } };
      } else {
        return {
          error: {
            message:
              "Cant update this items listing templates.  Unable to adjustTemplatesInstart",
          },
        };
      }
    }
  }
}

module.exports = updateItemTemplatePrice;
