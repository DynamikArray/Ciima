/*
  WE DEPRECATED THIS USE ON FULL QUERY RESULTS as the inclusion of the
  XML Field was causing issues with the DISTINCT portion.
  This should be revisisted when we want to get an errors DETAILS on
  an indvidual level
/* Error Parser*/
const xml2js = require("xml2js-es6-promise");

const extractErrorMessages = (results) => {
  return results.reduce((acc, row) => {
    if (row.hasErrorMsg == "True") {
      row.hasErrorMsg = true;
      xml2js(row.ObjectXML).then((xmlResult) => {
        const strResult = JSON.parse(JSON.stringify(xmlResult));
        if (strResult.EbayListing.ErrorMessage) {
          row.errorMessages = strResult.EbayListing.ErrorMessage;
        }
      });
    } else {
      row.hasErrorMsg = false;
    }
    delete row.ObjectXML;
    acc.push(row);
    return acc;
  }, []);
};

module.exports = { extractErrorMessages };
