const fieldNames = [
  "inventoryTitle",
  "extraDescription",
  "locationCode",
  "grade",
  "quantity",
  "price",
  "ebaySiteCategoryId",
  "ebayStoreCategoryIdOne",
  "ebayStoreCategoryIdTwo",
  "series",
  "mainCharacter",
  "issueNumbers",
  "publisher",
  "publishedYear",
  "publishedDate",
  "main_image",
  "upc",
  "eBayCat1"
];

const fieldRules = {
  inventoryTitle: [
    v => !!v || "Inventory Title is a required field",
    v => v.length <= 80 || "inventoryTitle must be less than 80 characters"
  ],
  locationCode: [
    v => !!v || "Location code is a required field",
    v => v.length <= 50 || "Location Code must be less than 50 characters"
  ],
  grade: [
    v => !!v || "Grade is a required field",
    v => v.length <= 50 || "Grade must be less than 50 characters"
  ],
  quantity: [v => !!v || "Quantity is a required field"],
  price: [v => !!v || "Price is a required field"],
  series: [v => v.length <= 50 || "Series must be less than 50 characters"],
  mainCharacter: [
    v => v.length <= 50 || "Main Character must be less than 50 characters"
  ],
  issueNumbers: [
    v => v.length <= 50 || "Issue Numbers must be less than 50 characters"
  ],
  publisher: [
    v => v.length <= 50 || "Publisher must be less than 50 characters"
  ],
  publishedYear: [
    v => v.length <= 50 || "Published Year must be less than 50 characters"
  ],
  publishedDate: [
    v => v.length <= 50 || "Published Date must be less than 50 characters"
  ],
  ebaySiteCategoryId: [v => !!v || "Ebay Site Category is a required field"],
  ebayStoreCategoryIdOne: [
    v => !!v || "Ebay Store Category 1 is a required field"
  ],
  ebayStoreCategoryIdTwo: [
    v => !!v || "Ebay Store Category 2 is a required field"
  ]
};

module.exports = { fieldNames, fieldRules };
