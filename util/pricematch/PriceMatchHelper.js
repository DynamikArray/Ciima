const axios = require("axios");
const cheerio = require("cheerio");
const RETAILER_URL = "https://www.mycomicshop.com/search";
const queryString = require("query-string");

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
      result: { issues, pagination: { currentPGI: 0, prevnext, pager } },
      error: false,
    };
  } catch (e) {
    console.log(e);
    return { result: false, error: e };
  }
};

const getPageOfWebRetailerIssues = async (params) => {
  try {
    const currentPGI = params.pgi || 0;
    const fetched = await fetchResults(params);
    const parsed = parseIssues(fetched);
    const issues = parsed.map((issue, i) => {
      return { ...issue, ...{ _dataIndex: i } };
    });

    const prevnext = parsePrevNext(fetched);
    const pager = parsePagerPages(fetched);

    return {
      result: { issues, pagination: { currentPGI, prevnext, pager } },
      error: false,
    };
  } catch (e) {
    console.log(e.message);
    return { result: false, error: e.message };
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
  fields.title =
    $cheerio(el).find(".othercolleft .title a").text().trim() || false;
  fields.issueNumber =
    $cheerio(el).find(".othercolleft .title strong").text().trim() || false;

  fields.tags = [];
  $cheerio(el)
    .find(".othercolleft .indentrow a")
    .each((i, a) => {
      fields.tags.push($cheerio(a).text().trim());
    });

  $cheerio(el)
    .find(".othercolright a")
    .each((i, a) => {
      if (i == 0) fields.year = $cheerio(a).text().trim();
      if (i == 1) fields.publisher = $cheerio(a).text().trim();
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
      const itemPrice = {
        price: false,
        grade: false,
      };
      itemPrice.price = $cheerio(td)
        .find(".group .addcart a")
        .attr("data-price");

      itemPrice.grade = $cheerio(td)
        .find(".group .addcart a")
        .text()
        .replace("Add to cart", "")
        .replace("<br>", "");

      if (itemPrice.price) itemPrice.price = itemPrice.price.trim();
      if (itemPrice.grade) itemPrice.grade = itemPrice.grade.trim();

      prices.push(itemPrice);
    });

  prices.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));

  const priceGrades = prices
    .reduce((filtered, current) => {
      const x = filtered.find((item) => item.grade === current.grade);
      if (!x) return filtered.concat([current]);
      return filtered;
    }, [])
    .filter((prices) => !prices.grade.includes("CGC"));

  return priceGrades;
};

const parsePrevNext = ($cheerio) => {
  const prevNext = {
    prev: false,
    next: false,
  };

  $cheerio(".search-results .paginate ul").each((index, ul) => {
    if (index == 0) {
      $cheerio(ul).children((index, li) => {
        if (
          $cheerio(li).hasClass("prev") &&
          !$cheerio(li).hasClass("disabled")
        ) {
          prevNext.prev = formatPagerLink($cheerio(li).find("a").attr("href"));
        }
        if (
          $cheerio(li).hasClass("next") &&
          !$cheerio(li).hasClass("disabled")
        ) {
          prevNext.next = formatPagerLink($cheerio(li).find("a").attr("href"));
        }
      });
    }
  });
  return prevNext;
};

const formatPagerLink = (hrefVal) => {
  const link = hrefVal.replace("search", "");
  return queryString.parse(link);
};

const parsePagerPages = ($cheerio) => {
  const pager = [];

  $cheerio(".search-results .paginate ul")
    .eq(0)
    .find("li a")
    .each((i, a) => {
      pager.push({
        text: $cheerio(a).text(),
        params: formatPagerLink($cheerio(a).attr("href")),
      });
    });
  return pager;
};

/*  EXPORT THE THINGS */
module.exports = {
  searchWebRetailerTitles,
  searchWebRetailerIssues,
  getPageOfWebRetailerIssues,
};
