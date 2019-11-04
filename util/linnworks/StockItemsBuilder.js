class StockItem {
  constructor(StockItemId, ItemTitle, ItemNumber, Price) {
    this.StockItemId = StockItemId;
    this.ItemTitle = ItemTitle;
    this.ItemNumber = ItemNumber;
    this.Price = Price;
  }
}

class StockItemsBuilder {
  constructor() {
    this.results = [];
  }

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

  addResults(results) {
    console.log("ADD OUR REUSLTS");
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
        this.results.push(stockItem);
      }
    });
    return true;
  }

  getResults() {
    console.log("GET OUR REUSLTS");
    return this.results;
  }
}

module.exports = StockItemsBuilder;
