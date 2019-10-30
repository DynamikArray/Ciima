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
    console.log("Search Strat");

    try {
      logger.debug(`Searching mycomicshop for ${searchString}`);

      //some container variables
      let issuesCount = 0;
      const prices = [];

      console.log("BEFORE AXIOS");

      const html = await axios.get(URL, {
        params: { q: searchString },
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36"
        }
      });

      console.log("AFTER AXIOS");

      const $ = await cheerio.load(html.data);

      console.log("AFTER CHEERIO LOAD");

      $(".search-results li.issue").each((li, LI_elem) => {
        console.log("EACH .search-results li.issue");
        const itemData = {};
        //get our imagefields
        itemData.imgFull = $(".imgcol span.img a", LI_elem).attr("href");
        itemData.imgThumb = $(".imgcol span.img img", LI_elem).attr("src");
        //now get all the meta fields
        $("table.issuestock tr td", LI_elem).each((td, TD_elem) => {
          console.log("EACH table.issuestock tr td");
          $("meta", TD_elem).each((meta, META_elem) => {
            console.log("EACH meta");
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

      console.log("bout to send prices back");

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
