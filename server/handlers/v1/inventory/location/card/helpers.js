//
//
const buildCardsQueries = (box, box_id) => {
  //defaults show most recent
  //  let selectQuery = `SELECT * FROM (SELECT * FROM slc_location_cards WHERE (id > ? AND card LIKE concat('%',?,'%') ) LIMIT ?) sorted ORDER BY id DESC`;
  let selectQuery = `SELECT * FROM (SELECT c.id, b.box, c.box_id, c.card, c.full_location, c.notes, c.dateCreated  FROM slc_location_cards c, slc_location_boxes b WHERE (c.id > ? AND c.full_location LIKE concat('%',?,'%') AND c.box_id = b.id ) LIMIT ?) sorted ORDER BY id DESC`;
  let totalQuery = `SELECT COUNT(*) as rowCount FROM slc_location_cards WHERE (id > 0 AND full_location LIKE concat('%',?,'%')) ORDER BY id DESC`;

  //load cards for selected box
  if (box_id) {
    selectQuery = `SELECT * FROM (SELECT c.id, b.box, c.box_id, c.card, c.full_location, c.notes, c.dateCreated  FROM slc_location_cards c, slc_location_boxes b WHERE (c.id > ? AND c.full_location LIKE concat('%',?,'%') AND c.box_id = ? AND c.box_id = b.id ) LIMIT ?) sorted ORDER BY id DESC`;
    totalQuery = `SELECT COUNT(*) as rowCount FROM slc_location_cards WHERE (id > 0 AND full_location LIKE concat('%',?,'%') AND box_id = ?) ORDER BY id DESC`;
  }

  return { selectQuery, totalQuery };
};

//
//
const buildCardsQueriesParams = (nextPage, box, box_id, pageLimit) => {
  //default most recent
  let selectParams = [nextPage, box, pageLimit];
  let totalParams = [box];

  if (box_id) {
    selectParams = [nextPage, box, box_id, pageLimit];
    totalParams = [box, box_id];
  }

  return { selectParams, totalParams };
};

const buildInventoryCardQueries = () => {
  let selectQuery = `
        SELECT
      	i.*,
      	c.card,
      	b.box,
      	c.full_location
      FROM
      	slc_inventory i,
      	slc_location_cards c,
      	slc_location_boxes b
      WHERE (
      	(c.full_location = i.location)
      	AND
      	(c.id = ?)
      	AND
      	(c.box_id = b.id )
      )
      ORDER BY card ASC,	endDateTime desc LIMIT ?;`;

  let totalQuery = `
      SELECT
          Count(*) as rowCount
      FROM
        slc_inventory i,
        slc_location_cards c,
        slc_location_boxes b
      WHERE (
        (c.full_location = i.location)
        AND
        (c.id = ?)
        AND
        (c.box_id = b.id )
      )
      ORDER BY card ASC, endDateTime desc `;

  return { selectQuery, totalQuery };
};

module.exports = {
  buildCardsQueries,
  buildCardsQueriesParams,
  buildInventoryCardQueries
};
