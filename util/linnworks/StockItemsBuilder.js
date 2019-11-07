/**
 * StockItem - should be used to present a single unified inventory record from
 * linnworks, and in the future other channels (ebay)
 */
class StockItem {
  constructor(stockItemId, itemTitle, itemNumber, price) {
    //minimal product data
    this.stockItemId = stockItemId;
    this.itemTitle = itemTitle;
    this.itemNumber = itemNumber;
    this.price = price;
    //main image
    this.imageFull = false;
    this.imageThumb = false;
    //location - qty
    this.location = {
      id: false,
      name: false,
      qty: false,
      multiple: false
    };

    this.meta = {
      application: false
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

  addImage(imgThumb, imgFull) {
    this.imageThumb = imgThumb;
    this.imageFull = imgFull;
    return this;
  }

  addMetaApplication(application) {
    this.meta.application = application;
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
  //
  getResults() {
    return this.results;
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
    const qty = locations[0].StockLevel;
    const id = locations[0].Location.StockLocationId;
    const name = locations[0].Location.BinRack;

    let multi = false;
    if (locations.length > 1) multi = true;

    return { id, name, qty, multi };
  }
  //
  //
  //
  formatImages(images) {
    const main = images.filter(img => img.IsMain);
    if (main.length == 1) {
      const imgFull = main[0].FullSource;
      const imgThumb = main[0].Source;
      return { imgThumb, imgFull };
    }
    return { imgThumb: false, imgFull: false };
  }

  //
  //
  //
  addResults(results) {
    results.forEach(item => {
      if (this.shouldInclude(item.CategoryName)) {
        const { StockItemId, ItemTitle, ItemNumber } = item;

        let Price = "NA";
        if (item.ItemChannelPrices.length > 0) {
          Price = item.ItemChannelPrices[0].Price;
        }

        //create new stockItem instance
        const stockItem = new StockItem(
          StockItemId,
          ItemTitle,
          ItemNumber,
          Price
        );

        //format raw stocklevels object and make into our formt
        const { id, name, qty, multi } = this.formatLocations(item.StockLevels);
        //add that location object to our stockItem
        stockItem.addLocation(id, name, qty, multi);
        //add the main image
        const { imgThumb, imgFull } = this.formatImages(item.Images);
        stockItem.addImage(imgThumb, imgFull);
        stockItem.addMetaApplication("Linnworks");

        //include onto  results
        this.results.push(stockItem);
      }
    });
    return true;
  }
}

module.exports = StockItemsBuilder;
