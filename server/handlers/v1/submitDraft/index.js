const linnworks = require("../../../util/linnworks");

module.exports = fastify => ({
  submitDraft: async (req, reply) => {
    const dbHelper = require("../../../util/dbHelper.js")(fastify);

    const { id } = req.body;

    const query = `SELECT * FROM slc_drafts WHERE id = ?`;
    const result = await dbHelper.query(query, [id]);

    //console.log("THIS DRAFT NEEDS TO BE SENT TO LINNWORKS", result);
    //if we have single row list it
    if (result.rows && result.rows.length == 1) {
      //push to worker at some point
      //
      const listingResults = linnworks.listItem(result.rows[0]);

      return listingResults;
      //connect to linnworks
      //add item
    }

    //Unexpected repsonse return
    return result;
  }
});
