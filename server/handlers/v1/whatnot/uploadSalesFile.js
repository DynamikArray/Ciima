const csv = require("fast-csv");
const emojiStrip = require("emoji-strip");

const { format, parse } = require("date-fns");
const dateFilterDateFormat = "yyyy-MM-dd";
const mySqlDateFormat = "yyyy/MM/dd";

const fields = [
  "order_id",
  "buyer",
  "product_name",
  "product_description",
  "sold_price",
  "cancelled",
  "bundled",
  "tracking",
  "shipment_manifest",
  "label_only",
  "fileDate",
];

function buildQueryValues(rows, salesDate) {
  return rows
    .map((row) => {
      //make ints
      row.order_id = parseInt(row.order_id);
      row.sold_price = parseInt(row.sold_price);
      //strip emojis
      row.buyer = emojiStrip(row.buyer);
      row.product_name = emojiStrip(row.product_name);
      row.product_description = emojiStrip(row.product_description);
      //set to booleans
      if (row.bundled == "True") row.bundled = 1;
      if (row.bundled == "False") row.bundled = 0;
      if (row.cancelled == "Yes") row.cancelled = 1;
      if (row.cancelled == "") row.cancelled = 0;
      //Add Sales Date
      row.saleDate = salesDate; // ;
      //return it all
      return row;
    })
    .map((row) => Object.values(row)); //Return only the values, for inserting, not field names
}

async function handleInsert(fastify, query, queryValues, resolve, reject) {
  try {
    const result = await fastify.mysql.query(query, [queryValues]);
    fastify.winston.info(`Records Saved to DB -  ${JSON.stringify(result[0])}`);
    resolve({ result: result[0] });
  } catch (e) {
    reject(e);
  }
}

module.exports = (fastify) => ({
  uploadSalesFile: async (req, reply) => {
    //verify fileDate Format
    const fileDate = req.body.fileDate;
    try {
      const newDate = format(parse(fileDate, dateFilterDateFormat, new Date()), mySqlDateFormat);
      console.log(newDate);
    } catch (e) {
      throw new Error(`FileDate of: ${fileDate}  - is not in the correct format YYYY-MM-DD`);
    }

    return new Promise((resolve, reject) => {
      const parsedRows = [];
      //handle parsing csv
      csv
        .parseString(req.body.file.data, { headers: (headers) => headers.map((h) => h.replace(" ", "_")) })
        .on("error", (error) => {
          fastify.winston.error(error.message);
          reject(error);
        })
        .on("data", (row) => parsedRows.push(row))
        .on("end", (rowCount) => {
          fastify.winston.info(`uploadSalesFile - endHandler() - Rows Length - ${parsedRows.length} - RowCount ${rowCount}`);
          //transform the array of values
          const queryValues = buildQueryValues(parsedRows, fileDate);
          //build SQL
          const query = `INSERT IGNORE INTO slc_whatnot_sales ( ${fields} ) VALUES ?;`;
          //Run Query and handle calling resolve/reject
          handleInsert(fastify, query, queryValues, resolve, reject);
        });
    });
  },
});
