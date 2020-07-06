//The fixList should contain all the checks in order
const fixList = [
  [", The ", " "],
  [", The", ""],
  ["(", ""],
  [")", ""],
  ["Vol.", "Vol"]
];

//Cleans the title of the fixlist in order
const titleCleaner = title => {
  try {
    fixList.forEach(item => {
      title = title.replace(item[0], item[1]);
    });
    return title;
  } catch (e) {
    return title;
  }
};

const issueCleaner = issue => {
  try {
    return issue;
  } catch (e) {
    return issue;
  }
};

module.exports = { titleCleaner, issueCleaner };
