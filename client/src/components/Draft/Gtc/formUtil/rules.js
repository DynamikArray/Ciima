const fieldRules = {
  inventoryTitle: [
    v => !!v || "Inventory Title is a required field",
    v => {
      if (v.toLowerCase().includes("mystery"))
        return "Ebay does not allow the word Mystery, please change this word";
      return false;
    },
    v => v.length <= 80 || "inventoryTitle must be less than 80 characters"
  ],
  locationCode: [
    v => !!v || "Location/Sku is a required field",
    v => v.length <= 50 || "Location Code must be less than 50 characters"
  ],
  price: [v => !!v || "Price is a required field"],
  quantity: [
    v => !!v || "Quantity is a required field",
    v =>
      !!Number(v) > 0 || "Quantity must be greater than zero or is not a number"
  ],
  ebaySiteCategoryId: [v => !!v || "Ebay Site Category is a required field"],
  ebayStoreCategoryIdOne: [
    v => !!v || "Ebay Store Category 1 is a required field"
  ],
  ebayStoreCategoryIdTwo: [
    v => !!v || "Ebay Store Category 2 is a required field"
  ],
  mainCharacter: [
    v => !!v || "Main Character is a required field",
    v => v.length <= 50 || "Main Character must be less than 50 characters"
  ],
  publisher: [
    v => !!v || "Publisher is a required field",
    v => v.length <= 50 || "Publisher must be less than 50 characters"
  ]
};

module.exports = fieldRules;
