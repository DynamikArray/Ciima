const uuidv1 = require("uuid/v1");

const { DRAFT } = require("../../../../util/auditLog/logResourceTypes");
const {
  CREATE_DRAFT,
  UPDATE_DRAFT,
  UPDATE_DRAFT_FIELD,
  DELETE_DRAFT
} = require("../../../../util/auditLog/logActionTypes");

/**
 * Keep Alive handler
 *
 * @param {FastifyRequest} request
 * @param {FastifyReply} reply
 */
module.exports = fastify => ({
  createHandler: async (req, res) => {
    //get our userId since they were auth'd
    const ownerId = req.user.id;

    //pull off our body props
    const {
      inventoryTitle,
      extraDescription,
      locationCode,
      grade,
      quantity,
      price,
      upc,
      ebaySiteCategoryId,
      ebayStoreCategoryIdOne,
      ebayStoreCategoryIdTwo,
      series,
      mainCharacter,
      issueNumbers,
      publisher,
      publishedYear,
      publishedDate,
      draftType,
      main_image,
      other_images
    } = req.body;

    // TODO: bring into the listing process of the worker, so resubmits are easier
    //create the UUID and ItemNumber for the items inclusion on linnworks
    const stockItemId = uuidv1();
    const itemNumber = Date.now().toString(); //aka SKU

    //TODO ESCAPE CHARACHTER LIST???
    //   this is not a single tick = "’"
    const cleanImages = other_images.map(img => {
      const url = img.imageUrl.replace("'", "\u2019");
      return {
        imageUrl: url
      };
    });

    const draft = {
      stockItemId,
      itemNumber,
      inventoryTitle,
      extraDescription,
      locationCode,
      upc,
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
      draftType,
      main_image,
      other_images: JSON.stringify(cleanImages),
      ownerId
    };

    const query = "INSERT INTO slc_drafts SET ?";

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      let successResult,
        errorResult = false;
      try {
        const [rows, fields] = await connection.query(query, draft);
        connection.release();
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
    }
    return { error: "No db connection" };
  },

  //
  //
  //
  readHandler: async (req, res) => {
    const { id } = req.params;
    if (!id) return { error: "No id supplied" };

    const query = "SELECT * FROM slc_drafts WHERE id = ?";

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, id);
        if (rows.length !== 1) {
          res.send({ error: "Record not found" });
        }
        connection.release();
        return { result: rows[0] };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
  },

  //
  //
  //Edit Draft
  editHandler: async (req, res) => {
    //pull off our body props
    const {
      id,
      inventoryTitle,
      extraDescription,
      locationCode,
      grade,
      quantity,
      price,
      upc,
      ebaySiteCategoryId,
      ebayStoreCategoryIdOne,
      ebayStoreCategoryIdTwo,
      series,
      mainCharacter,
      issueNumbers,
      publisher,
      publishedYear,
      publishedDate
    } = req.body;

    const draft = {
      inventoryTitle,
      extraDescription,
      locationCode,
      upc,
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
      publishedDate
    };

    const query = `UPDATE slc_drafts SET ? WHERE id=${id}`;

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, draft);
        connection.release();
        return { result: rows };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      } finally {
        fastify.auditLogger.log(
          UPDATE_DRAFT,
          req.user.id,
          id,
          DRAFT,
          JSON.stringify(draft)
        );
      }
    }
    return { error: "No db connection" };
  },

  //
  //
  //Delete Draft
  deleteHandler: async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM slc_drafts WHERE id=?`;
    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, id);
        connection.release();
        return { result: rows };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      } finally {
        fastify.auditLogger.log(
          DELETE_DRAFT,
          req.user.id,
          id,
          DRAFT,
          JSON.stringify(query)
        );
      }
    }
    return { error: "No db connection" };
  },

  updateHandler: async (req, res) => {
    const { id } = req.params;
    const params = [req.body.fieldName, req.body.fieldValue, id];

    const query = `UPDATE slc_drafts SET ?? = ? WHERE id=?`;

    const connection = await fastify.mysql.getConnection();

    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, params);
        connection.release();
        return { result: rows };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      } finally {
        fastify.auditLogger.log(
          UPDATE_DRAFT_FIELD,
          req.user.id,
          params[2],
          DRAFT,
          JSON.stringify({ fieldName: params[0], fieldValue: params[1] })
        );
      }
    }
    return { error: "No db connection" };
  }
});
