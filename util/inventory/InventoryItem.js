const { format, parseISO } = require("date-fns");

class InventoryItem {
  constructor(itemId, itemTitle) {
    this.itemId = itemId;
    this.itemTitle = itemTitle;

    this.itemNumber = "";

    this.imageFull = "";
    this.imageThumb = "";

    this.price = "";

    this.sku = "";
    this.quantity = "";
    this.location = "";
    /*
    this.binRack = "";

    //BREAK THE LOCATION INTO THE TWO PIECES, BOX / CARD
    this.boxOnly = "";
    this.boxDepth = "";
    */

    this.sourceProvider = "";
    this.startDateTime = "";
    this.endDateTime = "";

    this.hasEnded = 0;
  }
}

class InventoryItemBuilder {
  constructor(itemId, itemTitle) {
    this.item = new InventoryItem(itemId, itemTitle);
  }

  setItemNumber(val) {
    this.item.itemNumber = val;
    return this;
  }

  setImageFull(url) {
    this.item.imageFull = url;
    return this;
  }

  setImageThumb(url) {
    this.item.imageThumb = url;
    return this;
  }

  setPrice(price) {
    this.item.price = price;
    return this;
  }

  setSKU(sku) {
    this.item.sku = sku;
    return this;
  }

  setQuantity(qty) {
    this.item.quantity = qty;
    return this;
  }

  setLocation(location) {
    this.item.location = location || "";
    return this;
  }

  /*
  setBinRack(binRack) {
    this.item.binRack = binRack;
    return this;
  }

  setBoxOnly(boxOnly) {
    this.item.boxOnly = boxOnly;
    return this;
  }

  setBoxDepth(boxDepth) {
    this.item.boxDepth = boxDepth;
    return this;
  }
  */

  setStartDateTime(startDateTime) {
    this.item.startDateTime = format(
      parseISO(startDateTime),
      "yyyy-MM-dd HH:MM:SS"
    );
    return this;
  }

  setEndDateTime(endDateTime) {
    this.item.endDateTime = format(
      parseISO(endDateTime),
      "yyyy-MM-dd HH:MM:SS"
    );
    return this;
  }

  setSourceProvider(sourceProvider) {
    this.item.sourceProvider = sourceProvider;
    return this;
  }

  setHasEnded(bit) {
    this.item.hasEnded = bit;
    return this;
  }

  build() {
    return this.item;
  }
}

module.exports = { InventoryItemBuilder };
