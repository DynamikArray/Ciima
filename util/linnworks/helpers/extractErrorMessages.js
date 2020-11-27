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
