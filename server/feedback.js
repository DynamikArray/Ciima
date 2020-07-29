require("dotenv").config({ path: __dirname + "/../.env" });
const ebay = require("ebay-api");
const converter = require("json-2-csv");
const fs = require("fs");

const ebayUserId = "bobb-hewit";

function search({ page }) {
  return new Promise(function (resolve, reject) {
    const params = {
      DetailLevel: "ReturnAll",
      UserID: ebayUserId,
      Pagination: {
        entriesPerPage: 25,
        pageNumber: page,
      },
    };

    ebay.xmlRequest(
      {
        serviceName: "Trading",
        opType: "GetFeedback",
        appId: process.env.EBAY_APP_ID,
        devId: process.env.EBAY_DEV_ID,
        certId: process.env.EBAY_CERT_ID,
        authToken: process.env.EBAY_AUTH_TOKEN,
        params: params,
        parser: ebay.parseResponseJson, // (default)
      },
      (error, response) => {
        if (error) reject(error);
        resolve(response);
      }
    );
  });
}

const main = async () => {
  let i = 4;
  const allFeedback = [];

  do {
    console.log("fetching page: ", i);
    await search({ page: i })
      .then((res) => {
        if (res.PaginationResult) {
          console.log(res.PaginationResult);
        }
        if (res.FeedbackDetails) {
          res.FeedbackDetails.forEach((feedback, i) => {
            allFeedback.push(feedback);
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    i++;
  } while (i <= 4);

  return allFeedback;
};

main().then((results) => {
  converter.json2csv(results, (err, csv) => {
    if (err) {
      throw err;
    }

    fs.writeFileSync(`${ebayUserId}-feedback-page-3.csv`, csv);
  });
});
