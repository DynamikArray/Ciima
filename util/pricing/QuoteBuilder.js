class Quote {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.image = false;
    this.thumbnail = false;
    this.site = false;
    this.link = false;

    this.meta = {
      sellersInfo: false,
      listingDate: false
    };
  }
}

class QuoteBuilder {
  constructor(title, price) {
    this.quote = new Quote(title, price);
  }

  setImage(url) {
    this.quote.image = url;
    return this;
  }

  setThumbnail(url) {
    this.quote.thumbnail = url;
    return this;
  }

  setSite(site) {
    this.quote.site = site;
    return this;
  }

  setLink(link) {
    this.quote.link = link;
    return this;
  }

  setMetaSellersInfo(name, score, topRated) {
    this.quote.meta.sellersInfo = {};
    this.quote.meta.sellersInfo.name = name;
    this.quote.meta.sellersInfo.score = score;
    this.quote.meta.sellersInfo.topRated = topRated;
    return this;
  }

  setMetaListingDate(listingType, listingDate) {
    this.quote.meta.listingDate = {};
    this.quote.meta.listingDate.type = listingType;
    this.quote.meta.listingDate.value = listingDate;
    return this;
  }

  build() {
    return this.quote;
  }
}

module.exports = QuoteBuilder;
