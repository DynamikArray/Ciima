//The fixList should contain all the checks in order
const fixList = [[", The ", " "], [", The", ""]];

//Cleans the title of the fixlist in order
const titleCleaner = title => {
  try {
    fixList.forEach(item => {
      title = title.replace(item[0], item[1]);
    });
    return title;
  } catch (e) {
    console.log(e);
    return title;
  }
};

module.exports = { titleCleaner };
