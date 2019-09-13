/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
module.exports = fastify => ({
  draft: async (req, res) => {
    const draft = req.body;
    const dbHelper = require("../../../util/dbHelper.js")(fastify);

    const {
      inventoryTitle,
      locationCode,
      grade,
      quantity,
      price,
      ebaySiteCategoryId,
      ebayStoreCategoryIdOne,
      ebayStoreCategoryIdTwo,
      series,
      mainCharacter,
      issueNumbers,
      publisher,
      publishedYear,
      publishedDate,
      main_image
    } = req.body;

    // TODO: ADD other images to this insert
    const query = `INSERT INTO slc_drafts (
        inventoryTitle, locationCode, grade, quantity,
        price, ebaySiteCategoryId, ebayStoreCategoryIdOne,
        ebayStoreCategoryIdTwo, series, mainCharacter, issueNumbers,
        publisher, publishedYear, publishedDate,
        main_image
    ) VALUES ('${inventoryTitle}', '${locationCode}', '${grade}', '${quantity}',
      '${price}', '${ebaySiteCategoryId}', '${ebayStoreCategoryIdOne}',
      '${ebayStoreCategoryIdTwo}', '${series}', '${mainCharacter}', '${issueNumbers}',
      '${publisher}', '${publishedYear}', '${publishedDate}',
      '${main_image}');`;

    const result = await dbHelper.query(query);

    return result;
  }
});
