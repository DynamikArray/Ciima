const axios = require("axios");
const cheerio = require("cheerio");
const QuoteBuilder = require("../QuoteBuilder.js");

//include logger
const logger = require("../../winston/winston.js")({
  hostname: "Server"
});

/**
 * [mycomicshopWebsiteStrategy description]
 * @return {[type]} [description]
 */
function mycomicshopWebsiteStrategy() {
  const URL = "https://www.mycomicshop.com/search";

  //format out results to match our expected outputs
  const formatRawPriceQuote = data => {
    const { name, price, imgFull, imgThumb, url } = data;
    let quote = new QuoteBuilder(name, price)
      .setImage(imgFull)
      .setThumbnail(imgThumb)
      .setSite("mycomicshop")
      .setLink(url)
      .build();

    return quote;
  };

  //this is the main SEARCH routine that returns results back to our director method
  const search = async searchString => {
    try {
      logger.debug(`Searching mycomicshop for ${searchString}`);

      //some container variables
      let issuesCount = 0;
      const prices = [];

      const html = await axios
        .get(URL, {
          params: { q: searchString }
        })
        .catch(e => {
          console.log(e);
          throw e;
          return { error: e };
        });

      const $ = await cheerio.load(html.data);

      $(".search-results li.issue").each((li, LI_elem) => {
        const itemData = {};
        //get our imagefields
        itemData.imgFull = $(".imgcol span.img a", LI_elem).attr("href");
        itemData.imgThumb = $(".imgcol span.img img", LI_elem).attr("src");
        //now get all the meta fields
        $("table.issuestock tr td", LI_elem).each((td, TD_elem) => {
          $("meta", TD_elem).each((meta, META_elem) => {
            itemData[META_elem.attribs.itemprop] = META_elem.attribs.content;
          });
          //format this respose to one of our quote objects
          prices.push(formatRawPriceQuote(itemData));
          issuesCount++;
        });
      });

      logger.debug(
        `${this}:search() found ${issuesCount} issues for ${searchString}`
      );

      //we now have a bunch of price quotes but they dont match our "standard"
      return { result: prices };
    } catch (error) {
      logger.error(error);
      return { error };
    }
  };
  //return our search method to be used
  return { search };
}

module.exports = mycomicshopWebsiteStrategy;
