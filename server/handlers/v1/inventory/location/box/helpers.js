const buildInventoryBoxQueries = () => {
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
    	(location LIKE CONCAT('%',?,'-','%'))
    	AND
    	(c.full_location = i.location)
    	AND
    	(c.box_id = ?)
    	AND
    	(c.box_id = b.id )
    )
    ORDER BY 	card ASC,	endDateTime desc LIMIT ?;`;

  let totalQuery = `
      SELECT
        Count(*) as rowCount
    FROM
      slc_inventory i,
      slc_location_cards c,
      slc_location_boxes b
    WHERE (
      (location LIKE CONCAT(?,'-','%'))
      AND
      (c.full_location = i.location)
      AND
      (c.box_id = ?)
      AND
      (c.box_id = b.id )
    )
    ORDER BY card ASC, endDateTime desc `;

  return { selectQuery, totalQuery };
};

module.exports = { buildInventoryBoxQueries };
