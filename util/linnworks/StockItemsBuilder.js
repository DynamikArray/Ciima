/**
 * StockItem - should be used to present a single unified inventory record from
 * linnworks, and in the future other channels (ebay)
 */
class StockItem {
  constructor(stockItemId, itemTitle, itemNumber, price) {
    this.stockItemId = stockItemId;
    this.itemTitle = itemTitle;
    this.itemNumber = itemNumber;
    this.price = price;

    this.location = {
      id: false,
      name: false,
      qty: false,
      multiple: false
    };
  }
  //
  //
  //
  addLocation(locationId, locationName, qty, multiple = false) {
    this.location.id = locationId;
    this.location.name = locationName;
    this.location.qty = qty;
    this.location.multiple = multiple;
    return this;
  }
}

/**
 * StockItemsBuilder handles organizing the creation of a single clean unified
 * inventory results set from Linnworks.  Aggregrates the locations from an array
 * down to a single instance location, hopefully allowing the datatables to be built
 * and edited easier
 */
class StockItemsBuilder {
  constructor() {
    this.results = [];
  }
  //
  //
  shouldInclude(category) {
    switch (category) {
      case "EBAY-SETS":
        return true;
        break;
      case "EBAY-SINGLES":
        return true;
        break;
      default:
        return false;
        break;
    }
  }
  //
  //
  //
  formatLocations(locations) {
    console.log(locations, "\n\n");

    const qty = locations[0].Location.StockLevel;
    const id = locations[0].Location.StockLocationId;
    const name = locations[0].Location.BinRack;

    let multi = false;
    if (locations.length > 1) multi = true;

    return { id, name, qty, multi };
  }
  //
  //
  //
  addResults(results) {
    results.forEach(item => {
      if (this.shouldInclude(item.CategoryName)) {
        const { StockItemId, ItemTitle, ItemNumber } = item;
        const { Price } = item.ItemChannelPrices[0];
        const stockItem = new StockItem(
          StockItemId,
          ItemTitle,
          ItemNumber,
          Price
        );

        const { id, name, qty, multi } = this.formatLocations(item.StockLevels);
        stockItem.addLocation(id, name, qty, multi);
        this.results.push(stockItem);
      }
    });
    return true;
  }
  //
  //
  //
  getResults() {
    return this.results;
  }
}

module.exports = StockItemsBuilder;
