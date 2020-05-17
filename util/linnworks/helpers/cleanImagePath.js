/**
 * cleanImagePath - removes the special charachters from the url names so the json
 * can be passed into mysql or to linnworks or used in url paths
 * @param  {string} imageUrl the imageUrl from our database
 * @return {string}          [description]
 */
const cleanImagePath = imageUrl => {
  const str = imageUrl.replace("’", "'");
  return str;
};

module.exports = cleanImagePath;
