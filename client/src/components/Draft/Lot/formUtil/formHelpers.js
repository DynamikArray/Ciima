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
  const titleString = [];

  if (draft.characters) titleString.push(draft.characters.join(" "));

  if (draft.publisher) titleString.push(draft.publisher);

  if (draft.issuesCount) titleString.push(draft.issuesCount);

  titleString.push("Comic Book Lot");

  //Start doing length checks and removing words that we dont want??
  titleString.push("Comics");
  titleString.push("Collection");
  titleString.push("Set");
  titleString.push("Run");
  titleString.push("Box");

  return titleString.join(" ");
};

module.exports = { fieldNames, fieldRules, formatTitleFromDraft };
