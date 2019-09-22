/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
module.exports = fastify => ({
  draft: async (req, res) => {
    const draft = req.body;

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
      main_image,
      other_images
    } = req.body;

    //TODO ESCAPE CHARACHTER LIST???
    //   this is not a single tick = "’"

    const cleanImages = other_images.map(img => {
      const url = img.imageUrl.replace("'", "\u2019");
      return {
        imageUrl: url
      };
    });

    // TODO: ADD other images to this insert
    const query = `INSERT INTO slc_drafts (
        inventoryTitle, locationCode, grade, quantity,
        price, ebaySiteCategoryId, ebayStoreCategoryIdOne,
        ebayStoreCategoryIdTwo, series, mainCharacter, issueNumbers,
        publisher, publishedYear, publishedDate,
        main_image, other_images
    ) VALUES ('${inventoryTitle}', '${locationCode}', '${grade}', '${quantity}',
      '${price}', '${ebaySiteCategoryId}', '${ebayStoreCategoryIdOne}',
      '${ebayStoreCategoryIdTwo}', '${series}', '${mainCharacter}', '${issueNumbers}',
      '${publisher}', '${publishedYear}', '${publishedDate}',
      '${main_image}',  '${JSON.stringify(cleanImages)}');`;

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query);
        connection.release();
        return { result: rows };
      } catch (error) {
        fastify.winston.error(error);
        return { error: error.message };
      }
    }
    return { error: "No db connection" };
  }
});