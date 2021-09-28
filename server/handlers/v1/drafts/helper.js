const buildSelectQueries = () => {
  const selectQuery = `
      SELECT
        d.declinePrice,
        d.draftType,
        d.ebaySiteCategoryId,
        d.ebayStoreCategoryIdOne,
        d.ebayStoreCategoryIdTwo,
        d.extraDescription,
        d.grade,
        d.id,
        d.inventoryTitle,
        d.issueNumbers,
        d.itemNumber,
        d.locationCode,
        d.mainCharacter,
        d.main_image,
        d.other_images,
        d.price,
        d.publishedDate,
        d.publishedYear,
        d.publisher,
        d.quantity,
        d.series,
        d.status,
        d.statusNotes,
        d.stockItemId,
        d.upc,
        CONVERT_TZ(d.createdDate,'+00:00','-04:00')as createdDate, 
        u.displayname as ownerName,
        u.displaycolor as ownerColor
      FROM slc_drafts d
      LEFT JOIN slc_users u ON d.ownerId = u.id
      WHERE (
        (
          (inventoryTitle LIKE CONCAT("%",?,"%"))
          OR
          (locationCode LIKE CONCAT("%",?,"%"))
        )
        AND
        (status LIKE CONCAT("%",?,"%"))
        AND
        (draftType LIKE CONCAT("%",?,"%"))
        AND
        (CAST(DATE(d.createdDate)AS CHAR) LIKE CONCAT("%",?,"%"))
        AND
        (ownerId LIKE CONCAT("%",?,"%"))
      )
      ORDER BY d.createdDate DESC
      LIMIT ? OFFSET ?`;

  let totalQuery = `
    SELECT
      COUNT(*)as rowCount
    FROM slc_drafts d
    LEFT JOIN slc_users u ON d.ownerId = u.id
    WHERE (
      (
        (inventoryTitle LIKE CONCAT("%",?,"%"))
        OR
        (locationCode LIKE CONCAT("%",?,"%"))
      )
      AND
      (status LIKE CONCAT("%",?,"%"))
      AND
      (draftType LIKE CONCAT("%",?,"%"))
      AND
      (CAST(DATE(d.createdDate)AS CHAR) LIKE CONCAT("%",?,"%"))
      AND
      (ownerId LIKE CONCAT("%",?,"%"))
    )
    ORDER BY d.createdDate DESC `;

  return { selectQuery, totalQuery };
};

const buildSelectQueriesParams = (page, pageLimit, status, draftType, titleString, locationString, createdDate, userId) => {
  const pageOffset = page * pageLimit;
  //default most recent
  let selectParams = [titleString, locationString, status, draftType, createdDate, userId, pageLimit, pageOffset];
  let totalParams = [titleString, locationString, status, draftType, createdDate, userId];

  return { selectParams, totalParams };
};

module.exports = { buildSelectQueries, buildSelectQueriesParams };
