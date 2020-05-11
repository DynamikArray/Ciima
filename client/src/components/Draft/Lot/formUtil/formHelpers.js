const fieldNames = [
  "locationCode",
  "issuesCount",
  "inventoryTitle",

  "characters",
  "publisher",
  "price",
  "images",

  "extraDescription"
];

const fieldRules = {
  inventoryTitle: [
    v => !!v || "Inventory Title is a required field",
    v => v.length <= 80 || "inventoryTitle must be less than 80 characters"
  ],
  characters: [
    v => {
      if (!v || v.length < 1) return "Character is a required field";
      return false;
    }
  ],
  publisher: [
    v => {
      if (!v || v.length < 1) return "Publisher is a required field";
      return false;
    }
  ],
  locationCode: [
    v => !!v || "Location code is a required field",
    v => {
      if (!v.startsWith("EBAY-LOTS-"))
        return "Location code must start with EBAY-LOTS-";
      return false;
    },
    v => {
      if (v == "EBAY-LOTS-") return "You must enter a Location code";
      return false;
    },
    v => v.length <= 50 || "Location Code must be less than 50 characters"
  ],
  issuesCount: [
    v => !!v || "Issues Count is a required field",
    v =>
      !!Number(v) > 0 ||
      "Issues Count must be greater than zero or is not a number"
  ],
  price: [v => !!v || "Price is a required field"]
};

const formatTitleFromDraft = draft => {
  const terms = ["Lot Comic Book", "Comics", "Set", "Run", "Collection", "Box"];
  const titleString = [];
  if (draft.characters) titleString.push(draft.characters.join(" "));
  if (draft.publisher) titleString.push(draft.publisher.join(" "));
  if (draft.issuesCount) titleString.push(draft.issuesCount);
  titleString.push(terms.join(" "));
  return toTitleCase(shorten(titleString.join(" "), 80));
};

// Shorten a string to less than maxLen characters without truncating words.
// thanks stackoverflow
const shorten = (str, maxLen, separator = " ") => {
  if (str.length <= maxLen) return str;
  return str.substr(0, str.lastIndexOf(separator, maxLen));
};

const toTitleCase = str => {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

module.exports = { fieldNames, fieldRules, formatTitleFromDraft };
