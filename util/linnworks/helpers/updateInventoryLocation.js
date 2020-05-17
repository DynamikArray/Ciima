const { linnworks } = require("../linnworks.js");

const locationInfo = {
  StockLocationId: "00000000-0000-0000-0000-000000000000",
  LocationName: "Default"
};

const updateInventoryLocation = async (StockItemId, location) => {
  try {
    const inventoryItemLocation = [
      {
        StockLocationId: locationInfo.StockLocationId,
        LocationName: locationInfo.LocationName,
        BinRack: location,
        StockItemId
      }
    ];

    const formattedLocation = `itemLocations=${JSON.stringify(
      inventoryItemLocation
    )}`;

    //CreateInventoryItemExtendedProperties
    const { result, error } = await linnworks.makeApiCall({
      method: "POST",
      url: "Inventory/UpdateItemLocations ",
      headers: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
      data: formattedLocation
    });

    if (result && !error) return { invResult: true };
    if (error && !result) return { invError: error };
  } catch (err) {
    console.log(err);
  }
};

module.exports = updateInventoryLocation;
