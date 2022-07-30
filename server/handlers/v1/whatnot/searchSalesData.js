const createSelectClause = () => {
  let strSQL = `SELECT
    DATE_FORMAT(fileDate, '%m-%d-%Y') as saleDate,
    order_id,
    buyer,
    product_name,
    product_description,
    sold_price,
    cancelled,
    bundled,
    tracking,
    shipment_manifest,
    label_only
    FROM slc_whatnot_sales
  `;

  return strSQL;
};

const createWhereClause = ({ buyer, saleDate }) => {
  let strSQL = `
    WHERE
    (
      ( buyer LIKE ('%${buyer || ""}%') )
      AND
      ( fileDate LIKE ('%${saleDate || ""}%') )
    )
  `; //end where
  return strSQL;
};

const createOrderClause = () => {
  let strSQL = ` ORDER BY order_id desc`;
  return strSQL;
};

const createLimitClause = () => {
  let strSQL = ` LIMIT 1000`;
  return strSQL;
};

module.exports = (fastify) => ({
  searchSalesData: async (req, reply) => {
    let strSQL = createSelectClause();
    strSQL = strSQL + createWhereClause(req.body);
    strSQL = strSQL + createOrderClause();
    strSQL = strSQL + createLimitClause();
    const [rows, fields] = await fastify.mysql.query(strSQL);
    return { result: rows };
  },
});
