const helpers = require("./helpers");

module.exports = (fastify) => ({
  //
  //  (C)reate
  //
  createCardHandler: async (req, res) => {
    const { box_id, card, notes } = req.body;
    const cardData = { box_id, card, notes };

    const query = "INSERT INTO slc_location_cards SET ?";

    try {
      const [rows, fields] = await fastify.mysql.query(query, cardData);
      const { affectedRows, insertId } = rows;

      return { result: { affectedRows, insertId } };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },

  //
  //  (C)reate
  //
  createCardsHandler: async (req, res) => {
    const { box_id, cardFirst, cardLast, notes } = req.body;
    const cardData = [];

    //make sure first is less than last
    if (cardFirst >= cardLast) {
      return { error: { message: "First Card is not less than Last Card" } };
    }

    let card = cardFirst;
    for (card; card <= cardLast; card++) {
      cardData.push([box_id, card, notes]);
    }

    const query =
      "INSERT IGNORE INTO slc_location_cards (box_id, card, notes) VALUES ?;";

    try {
      const [rows, fields] = await fastify.mysql.query(query, [cardData]);

      const { affectedRows, insertId } = rows;

      return { result: { affectedRows, insertId } };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },

  //
  //  (R)Read
  //
  readCardHandler: async (req, res) => {
    const { id } = req.params;
    if (!id) return { error: "No id supplied" };

    const query = "SELECT * FROM slc_location_cards WHERE id = ?";

    try {
      const [rows, fields] = await fastify.mysql.query(query, id);
      if (rows.length !== 1) {
        res.send({ error: "Record not found" });
      }

      return { result: rows[0] };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },

  //
  //  (U)pdate
  //
  updateCardHandler: async (req, res) => {
    const { id } = req.params;
    if (!id) return { error: "No id supplied" };

    const { box_id, card, notes } = req.body;
    const cardData = { box_id, card, notes };

    const query = `UPDATE slc_location_cards SET ? WHERE id=${id}`;

    try {
      const [rows, fields] = await fastify.mysql.query(query, cardData);
      return { result: rows };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },

  //
  //  (D)elete
  //
  deleteCardHandler: async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM slc_location_cards WHERE id=?`;

    try {
      const [rows, fields] = await fastify.mysql.query(query, id);
      return { result: rows };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },

  //
  //  (S)earch Cards
  //
  searchCardsHandler: async (req, res) => {
    const box = req.body.search || "";
    const box_id = req.body.box_id || false;

    const nextPage = req.body.nextPageId || 0;
    const pageLimit = req.body.pageLimit || 500; //Limit to 500 by default, and let client handle filtering

    const { selectQuery, totalQuery } = helpers.buildCardsQueries(box, box_id);
    const { selectParams, totalParams } = helpers.buildCardsQueriesParams(
      nextPage,
      box,
      box_id,
      pageLimit
    );

    try {
      const [rows, fields] = await fastify.mysql.query(
        selectQuery,
        selectParams
      );
      const [totalRows] = await fastify.mysql.query(totalQuery, totalParams);

      //next Page
      let next = ([...rows].pop() || {}).id;
      if (rows.length < pageLimit) {
        next = false;
      }
      //PAGING totals
      const rowsTotal = totalRows[0].rowCount;

      return { result: { rowsTotal, pageLimit, next, rows } };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },
  //
  //

  //
  //  (I)nventory Items in a Card Location
  //
  inventoryCardHandler: async (req, res) => {
    const { id } = req.params;
    if (!id) return { error: "No id supplied" };

    const card_id = Number(id);
    const { card } = req.body || "";

    //const nextPage = req.body.nextPageId || 0; //not implemented on client side in any manner
    const pageLimit = req.body.pageLimit || 500; //Limit to 500 by default, and let client handle filtering

    const { selectQuery, totalQuery } = helpers.buildInventoryCardQueries();

    try {
      const [rows, fields] = await fastify.mysql.query(selectQuery, [
        card_id,
        pageLimit,
      ]);
      const [totalRows] = await fastify.mysql.query(totalQuery, [card_id]);
      let next = ([...rows].pop() || {}).id;
      if (rows.length < pageLimit) {
        next = false;
      }
      //PAGING totals
      const rowsTotal = totalRows[0].rowCount;

      return { result: { rowsTotal, pageLimit, next, rows } };
    } catch (error) {
      fastify.winston.error(error);
      res.send(error);
    }
  },

  //
});
