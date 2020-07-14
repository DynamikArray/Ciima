const axios = require("axios");
const cheerio = require("cheerio");
const RETAILER_URL = "https://www.mycomicshop.com/search";

/**
 * [searchWebRetailerTitles description]
 * @param  {[type]}  searchString [description]
 * @return {Promise}              [description]
 */
const searchWebRetailerTitles = async (searchString) => {
  const fetched = await fetchResults({ q: searchString });
  const titles = parseTitles(fetched);

  return { result: titles, error: false };
};

/**
 * [searchWebRetailerIssues description]
 * @param  {[type]}  TID [description]
 * @return {Promise}     [description]
 */
const searchWebRetailerIssues = async (TID) => {
  try {
    const fetched = await fetchResults({ TID });
    const parsed = parseIssues(fetched);
    const issues = parsed.map((issue, i) => {
      return { ...issue, ...{ _dataIndex: i } };
    });

    const prevnext = parsePrevNext(fetched);
    const pager = parsePagerPages(fetched);

    return {
      result: { issues, pagination: { prevnext, pager } },
      error: false,
    };
  } catch (e) {
    return { result: false, error: e };
  }
};

/**
 * [fetchResults description]
 * @param  {[type]}  searchString [description]
 * @return {Promise}              [description]
 */
const fetchResults = async (params) => {
  const html = await axios.get(RETAILER_URL, {
    params,
  });

  return await cheerio.load(html.data);
};

/**
 * parseTitles description
 * @param  {[type]} $cheerio [description]
 * @return {[type]}          [description]
 */
const parseTitles = ($cheerio) => {
  const titles = [];
  $cheerio(".search-results table.results tr").each((index, row) => {
    const title = {};
    if ($cheerio(row).attr("class") == "top-title") title.topTitle = true;
    $cheerio(row).children((i, cell) => {
      //title Id
      if ($cheerio(cell).attr("class") == "title")
        title.titleId = $cheerio(cell).find("a").attr("name");

      //all other cell data
      title[$cheerio(cell).attr("class")] = $cheerio(cell)
        .text()
        .trim()
        .replace(/\n/g, "");
    });
    titles.push(title);
  });
  return titles;
};

/**
 * parseIssues handle parsing for issue information from a cheerio obj
 * @param  {[type]} $cheerio [description]
 * @return {[type]}          [description]
 */
const parseIssues = ($cheerio) => {
  const issues = [];

  $cheerio(".search-results li.issue").each((index, row) => {
    let images = parseImages($cheerio, row);
    let fields = parseIssueFields($cheerio, row);
    let prices = parseIssuePrices($cheerio, row);
    const fullResult = { images, ...fields, prices };
    issues.push(fullResult);
  });

  return issues;
};

const parseImages = ($cheerio, el) => {
  const img = {};
  img.fullsize = $cheerio(el).find(".fancyboxthis").attr("href") || false;
  img.thumbnail = $cheerio(el).find(".fancyboxthis img").attr("src") || false;
  return img;
};

/**
 * parseIssueFields
 * @param  {[type]} $cheerio [description]
 * @param  {[type]} el       [description]
 * @return {[type]}          [description]
 */
const parseIssueFields = ($cheerio, el) => {
  const fields = {};
  fields.title = $cheerio(el).find(".othercolleft .title a").text() || false;
  fields.issueNumber =
    $cheerio(el).find(".othercolleft .title strong").text() || false;

  fields.tags = [];
  $cheerio(el)
    .find(".othercolleft .indentrow a")
    .each((i, a) => {
      fields.tags.push($cheerio(a).text());
    });

  $cheerio(el)
    .find(".othercolright a")
    .each((i, a) => {
      if (i == 0) fields.year = $cheerio(a).text();
      if (i == 1) fields.publisher = $cheerio(a).text();
    });
  return fields;
};

/**
 * [parseIssuePrices description]
 * @param  {[type]} $cheerio [description]
 * @param  {[type]} el       [description]
 * @return {[type]}          [description]
 */
const parseIssuePrices = ($cheerio, el) => {
  const prices = [];

  $cheerio(el)
    .find(".issuegrades .issuestock td")
    .each((i, td) => {
      const itemPrice = {};
      itemPrice.price = $cheerio(td)
        .find(".group .addcart a")
        .attr("data-price");

      itemPrice.grade = $cheerio(td)
        .find(".group .addcart a")
        .text()
        .replace("Add to cart", "")
        .replace("<br>", "");

      prices.push(itemPrice);
    });

  prices.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

  return [...new Set(prices)];
};

const parsePrevNext = ($cheerio) => {};
const parsePagerPages = ($cheerio) => {};

/*  EXPORT THE THINGS */
module.exports = { searchWebRetailerTitles, searchWebRetailerIssues };
