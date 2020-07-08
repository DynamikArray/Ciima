const uuidv1 = require("uuid/v1");
const { titleChecker } = require("../../../../../util/ciima/titleChecker");

const { DRAFT } = require("../../../../../util/auditLog/logResourceTypes");
const { CREATE_DRAFT } = require("../../../../../util/auditLog/logActionTypes");

const EBAY_OTHER_MODERN_SUPERHEROS = 155290;
const STORE_OTHER = 1;
const STORE_LOTS = 6583322015;

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
      quantity: 1,
      draftType: "lots",
      ownerId: req.user.id,
      inventoryTitle: req.body.inventoryTitle,
      issueNumbers: req.body.issuesCount,
      mainCharacter: req.body.characters.join("|"),
      publisher: req.body.publisher.join("|"),
      locationCode: req.body.locationCode,
      price: req.body.price,
      extraDescription: req.body.extraDescription || "",
      main_image: main_image.src,
      other_images: JSON.stringify(other_images),
      ebaySiteCategoryId: EBAY_OTHER_MODERN_SUPERHEROS,
      ebayStoreCategoryIdOne: STORE_OTHER,
      ebayStoreCategoryIdTwo: STORE_LOTS,
    };

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
      res.send(error);
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

  /**
   * [checkTitleHandler Checks to see if this title is a duplicate ]
   * @param  {[type]}  req [description]
   * @param  {[type]}  res [description]
   * @return {Promise}     [description]
   */
  checkTitleHandler: async (req, res) => {
    const { title } = req.body;
    const { result, error } = await titleChecker(title, fastify);

    if (result && !error) return { result };
    if (error && !result) res.send(error);

    //return { result: { passed: true, failed: false } };

    /*
    function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));    }
    await sleep(2000);
    return { result: { passed: false, failed: true } };
    //*/
  },
});
