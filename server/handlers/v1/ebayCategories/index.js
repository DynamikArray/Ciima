const ebay = require("ebay-api");

module.exports = (fastify) => ({
  ebayCategories: async (req, reply) => {
    const query = `SELECT
        id,
        ebayCategoryId,
        ebayCategoryName
        FROM
          slc_ebay_site_categories c
        WHERE (c.ebayCategoryName LIKE concat('%',?,'%') )
        ORDER BY ebayCategoryName ASC`;

    const [rows, fields] = await fastify.mysql.query(query, [req.query.q]);

    return { result: rows };
  },

  /**
   * ebaySiteCategories handling calling ebay and looking for category
   * information and returing to client
   *
   * @param  {[type]}  req   [description]
   * @param  {[type]}  reply [description]
   * @return {Promise}       [description]
   */
  ebaySiteCategories: async (req, reply) => {
    return new Promise((resolve, reject) => {
      try {
        let params = {
          DetailLevel: "ReturnAll",
          ...req.query,
        };

        ebay.xmlRequest(
          {
            serviceName: "Trading",
            opType: "GetCategories",
            appId: process.env.EBAY_APP_ID,
            devId: process.env.EBAY_DEV_ID,
            certId: process.env.EBAY_CERT_ID,
            authToken: process.env.EBAY_AUTH_TOKEN,
            params,
            parser: ebay.parseResponseJson, // (default)
          },
          (error, itemsResponse) => {
            if (error) reject(error);
            resolve({ results: itemsResponse.Categorys });
          }
        );
      } catch (e) {
        reject(e);
      }
    });
  },

  //
  //
  //
});
