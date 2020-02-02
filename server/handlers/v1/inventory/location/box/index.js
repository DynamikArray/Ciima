const helpers = require("./helpers");

module.exports = fastify => ({
  //
  //  (C)reate
  //
  createBoxHandler: async (req, res) => {
    //
    const { box, box_type, notes } = req.body;
    const newBox = { box, box_type, notes };

    const query = "INSERT INTO slc_location_boxes SET ?";

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, newBox);
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
  //  (R)ead
  //
  readBoxHandler: async (req, res) => {
    const { id } = req.params;
    if (!id) return { error: "No id supplied" };

    const query = "SELECT * FROM slc_location_boxes WHERE id = ?";

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
  updateBoxHandler: async (req, res) => {
    const { id } = req.params;
    if (!id) return { error: "No id supplied" };

    const { box, box_type, notes } = req.body;
    const boxData = { box, box_type, notes };

    const query = `UPDATE slc_location_boxes SET ? WHERE id=${id}`;

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(query, boxData);
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
  deleteBoxHandler: async (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM slc_location_boxes WHERE id=?`;

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
  //  (S)earch Boxes
  //
  searchBoxesHandler: async (req, res) => {
    const box = req.body.search || "";
    const box_type = req.body.box_type || "";

    const nextPage = req.body.nextPageId || 0;
    const pageLimit = req.body.pageLimit || 500; //Limit to 500 by default, and let client handle filtering

    const selectQuery = `SELECT * FROM (SELECT * FROM slc_location_boxes WHERE (id > ? AND box LIKE concat('%',?,'%') AND box_type LIKE concat('%',?,'%')  ) LIMIT ?)sorted ORDER BY id DESC`;

    const totalQuery =
      "SELECT COUNT(*) as rowCount FROM slc_location_boxes WHERE (id > 0 AND box LIKE concat('%',?,'%') AND box_type LIKE concat('%',?,'%')   ) ORDER BY id DESC";

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(selectQuery, [
          nextPage,
          box,
          box_type,
          pageLimit
        ]);
        const [totalRows] = await connection.query(totalQuery, [box, box_type]);

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
  //  (I)nventory Items in a Box Location
  //
  //    PAGINING DOESNT WORK IN ANY FASION YET
  //
  //
  inventoryBoxHandler: async (req, res) => {
    const { id } = req.params;
    if (!id) return { error: "No id supplied" };

    const box_id = Number(id);
    const { box } = req.body || "";

    //const nextPage = req.body.nextPageId || 0; //not implemented on client side in any manner
    const pageLimit = req.body.pageLimit || 500; //Limit to 500 by default, and let client handle filtering

    const { selectQuery, totalQuery } = helpers.buildInventoryBoxQueries();

    const connection = await fastify.mysql.getConnection();
    if (connection) {
      try {
        const [rows, fields] = await connection.query(selectQuery, [
          box,
          box_id,
          pageLimit
        ]);
        const [totalRows] = await connection.query(totalQuery, [box, box_id]);
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
  }
});
