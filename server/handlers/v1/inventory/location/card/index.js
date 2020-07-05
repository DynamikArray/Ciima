const helpers = require("./helpers");

module.exports = (fastify) => ({
  //
  //  (C)reate
  //
  createCardHandler: async (req, res) => {
    const { box_id, card, notes } = req.body;
    const cardData = { box_id, card, notes };

    const query = "INSERT INTO slc_location_cards SET ?";

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, cardData);
        const { affectedRows, insertId } = rows;
        connection.release();
        return { result: { affectedRows, insertId } };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
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

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, [cardData]);

        const { affectedRows, insertId } = rows;
        connection.release();
        return { result: { affectedRows, insertId } };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
  },

  //
  //  (R)Read
  //
  readCardHandler: async (req, res) => {
    const { id } = req.params;
    if (!id) return { error: "No id supplied" };

    const query = "SELECT * FROM slc_location_cards WHERE id = ?";

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
  //  (U)pdate
  //
  updateCardHandler: async (req, res) => {
    const { id } = req.params;
    if (!id) return { error: "No id supplied" };

    const { box_id, card, notes } = req.body;
    const cardData = { box_id, card, notes };

    const query = `UPDATE slc_location_cards SET ? WHERE id=${id}`;

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, cardData);
        connection.release();
        return { result: rows };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
  },

  //
  //  (D)elete
  //
  deleteCardHandler: async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM slc_location_cards WHERE id=?`;

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, id);
        connection.release();
        return { result: rows };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
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

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(
          selectQuery,
          selectParams
        );
        const [totalRows] = await connection.query(totalQuery, totalParams);

        //next Page
        let next = ([...rows].pop() || {}).id;
        if (rows.length < pageLimit) {
          next = false;
        }
        //PAGING totals
        const rowsTotal = totalRows[0].rowCount;

        connection.release();
        return { result: { rowsTotal, pageLimit, next, rows } };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
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

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(selectQuery, [
          card_id,
          pageLimit,
        ]);
        const [totalRows] = await connection.query(totalQuery, [card_id]);
        let next = ([...rows].pop() || {}).id;
        if (rows.length < pageLimit) {
          next = false;
        }
        //PAGING totals
        const rowsTotal = totalRows[0].rowCount;
        connection.release();
        return { result: { rowsTotal, pageLimit, next, rows } };
      } catch (error) {
        fastify.winston.error(error);
        res.send(error);
      }
    }
    return { error: "No db connection" };
  },

  //
});
