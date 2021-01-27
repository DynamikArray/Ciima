const { LINNWORKS } = require("../../../../../util/auditLog/logResourceTypes");
const { UPDATE_PRICE_FIELD } = require("../../../../../util/auditLog/logActionTypes");
const getInventoryItemPrices = require("../../../../../util/linnworks/helpers/getInventoryItemPrices");

module.exports = (fastify) => ({
  updatePriceHandler: async (req, res) => {
    const { inventoryItemId, fieldName, fieldValue } = req.body;

    switch (fieldName) {
      case "RetailPrice":
        const { result, error } = await updateRetailPrice(inventoryItemId, fieldValue);
        if (result) {
          return await updateListingPrice(inventoryItemId, fieldValue);
        }
        if (error) return { error };
        break;
      case "StartPrice":
        return await updateStartPrice(inventoryItemId, fieldValue);
        break;
      case "DeclinePrice":
        return await updateDeclinePrice(inventoryItemId, fieldValue);
        break;
    }

    async function updateRetailPrice(itemId, value) {
      let enumField = 3;
      let formattedData = `inventoryItemId=${itemId}&fieldName=${enumField}&fieldValue=${value}`;
      try {
        const { result, error } = await fastify.linnworks.makeApiCall({
          method: "POST",
          url: `Inventory/UpdateInventoryItemField`,
          headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
          data: formattedData,
        });

        if (result && !error) return { result: "success" };

        if (error && !result) {
          localErrorHandler(error);
          return { error };
        }
      } catch (error) {
        localErrorHandler(error);
      } finally {
        writeLogEntry(req.user.id, itemId, "RetailPrice", value);
      }
    }

    async function updateStartPrice(itemId, value) {
      const newPrices = await fetchPriceByTag(itemId, value, "Start");
      if (newPrices) {
        if (newPrices.length > 1) localErrorHandler("More than one price found for Start Tag - using first");
        return await updatePrice(itemId, newPrices[0]);
      }
      return { error: "No Prices" };
    }

    async function updateDeclinePrice(itemId, value) {
      const newPrices = await fetchPriceByTag(itemId, value, "Decline");
      if (newPrices) {
        if (newPrices.length > 1) localErrorHandler("More than one price found for Decline Tag - using first");
        return await updatePrice(itemId, newPrices[0]);
      }
      return { error: "No Prices" };
    }

    async function updateListingPrice(itemId, value) {
      return { error: "CANNOT UPDATE LISTING PRICE DUE TO LINNWORKS ERROR" };

      const newPrices = await fetchPriceByTag(itemId, value, "");
      if (newPrices) return await updatePrice(itemId, newPrices[0]);
      return { error: "No Prices" };
    }

    /*
      const { pricesResult, pricesError } = await getInventoryItemPrices(itemId);

      if (pricesResult) {
        const newPrices = pricesResult.reduce((acc, price) => {
          if (price.Tag.toUpperCase() === "") {
            acc.push({ ...price, Price: value, IsChanged: true });
          } else {
            acc.push(price);
          }
          return acc;
        }, []);

        const result = await updatePrices(itemId, newPrices);
        console.log(result);
        /*
        const results = await Promise.all(
          newPrices.map(async (price) => {
            return await updatePrice(itemId, price);
          })
        );
        */

    async function fetchPriceByTag(itemId, value, tag) {
      const { pricesResult, pricesError } = await getInventoryItemPrices(itemId);
      if (pricesResult) {
        const prices = pricesResult.filter((price) => price.Tag.toUpperCase() == tag.toUpperCase());
        const newPrices = prices.reduce((acc, price) => {
          const newPrice = { ...price, UpdateStatus: "NoChange", Price: value, IsChanged: true };
          acc.push(newPrice);
          return acc;
        }, []);

        return newPrices;
      }
      return false;
    }

    async function updatePrice(itemId, price) {
      const formattedData = `inventoryItemPrices=${JSON.stringify([price])}`;
      try {
        const { result, error } = await fastify.linnworks.makeApiCall({
          method: "POST",
          url: "Inventory/UpdateInventoryItemPrices",
          headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
          data: formattedData,
        });

        if (result) return { result, error: false };
        if (error) return { error, result: false };
      } catch (error) {
        localErrorHandler(error);
      } finally {
        writeLogEntry(req.user.id, itemId, "Price", price);
      }
    }

    async function updatePrices(itemId, prices) {
      const formattedData = `inventoryItemPrices=${JSON.stringify(prices)}`;
      try {
        const { result, error } = await fastify.linnworks.makeApiCall({
          method: "POST",
          url: "Inventory/UpdateInventoryItemPrices",
          headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
          data: formattedData,
        });

        if (result) return { result, error: false };
        if (error) return { error, result: false };
      } catch (error) {
        localErrorHandler(error);
      } finally {
        writeLogEntry(req.user.id, itemId, "Prices", prices);
      }
    }

    function writeLogEntry(userId, itemId, fieldName, fieldValue) {
      fastify.auditLogger.log(UPDATE_PRICE_FIELD, userId, itemId, LINNWORKS, JSON.stringify({ fieldName, fieldValue }));
    }

    function localErrorHandler(error) {
      fastify.winston.error(JSON.stringify({ method: "updateFieldHandler", error }));
    }
  },
});
