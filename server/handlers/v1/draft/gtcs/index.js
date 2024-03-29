const uuidv1 = require("uuid/v1");
//const { titleChecker } = require("../../../../../util/ciima/titleChecker");

const { DRAFT } = require("../../../../../util/auditLog/logResourceTypes");
const { CREATE_DRAFT } = require("../../../../../util/auditLog/logActionTypes");

/*
const EBAY_OTHER_MODERN_SUPERHEROS = 155290;
const STORE_OTHER = 1;
const STORE_LOTS = 6583322015;
*/

/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
module.exports = (fastify) => ({
  createHandler: async (req, res) => {
    //create the UUID and ItemNumber for the items inclusion on linnworks
    const stockItemId = uuidv1(); //MOVE TO SUBMIT JOB???
    const itemNumber = Date.now().toString(); //aka SKU

    const images = req.body.images;

    const main_image = req.body.images.shift();
    const other_images = images.map((img) => {
      const url = img.src.replace("'", "\u2019");
      return {
        imageUrl: url,
      };
    });

    const draft = {
      stockItemId,
      itemNumber,
      quantity: req.body.quantity,
      draftType: "gtcs",
      ownerId: req.user.id,
      inventoryTitle: req.body.inventoryTitle,
      issueNumbers: req.body.issuesCount || "",
      mainCharacter: req.body.mainCharacter,
      publisher: req.body.publisher,
      locationCode: req.body.locationCode,
      price: req.body.price,
      extraDescription: req.body.extraDescription || "",
      main_image: main_image.src,
      other_images: JSON.stringify(other_images),
      ebaySiteCategoryId: req.body.ebaySiteCategoryId,
      ebaySiteCategoryFields: JSON.stringify(req.body.ebaySiteCategoryFields),
      ebayStoreCategoryIdOne: req.body.ebayStoreCategoryIdOne,
      ebayStoreCategoryIdTwo: req.body.ebayStoreCategoryIdTwo,
    };

    if (req.body.declinePrice) {
      draft.declinePrice = req.body.declinePrice;
    }

    const query = "INSERT INTO slc_drafts SET ?";

    let successResult,
      errorResult = false;

    try {
      const [rows, fields] = await fastify.mysql.query(query, draft);
      successResult = rows;
      return { result: rows };
    } catch (error) {
      errorResult = error;
      fastify.winston.error(error);
      res.send(error).code(500);
    } finally {
      fastify.auditLogger.log(
        CREATE_DRAFT,
        req.user.id,
        successResult.insertId || 0,
        DRAFT,
        JSON.stringify({ successResult, errorResult })
      );
    }
  },
});
