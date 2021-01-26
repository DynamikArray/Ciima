export const fieldRules = {
  inventoryTitle: [
    v => !!v || "Inventory Title is a required field",
    v => v.length <= 80 || "inventoryTitle must be less than 80 characters"
  ],
  locationCode: [
    v => !!v || "Location Code is a required field",
    v => v.length <= 50 || "Location Code must be less than 50 characters"
  ],
  quantity: [
    v => !!v || "Quantity is a required field",
    v => {
      if (isNaN(Number(v))) return "Quantity must be a number.";
      return true;
    }
  ],
  retailPrice: [
    v => {
      if (v) {
        return !!Number(v) > 0 || "Retail Price should be greater than zero or is not a number";
      } else {
        return false;
      }
    }
  ],
  declinePrice: [
    v => {
      if (v) {
        return !!Number(v) > 0 || "Decline Price should be greater than zero or is not a number";
      } else {
        return false;
      }
    }
  ],
  startPrice: [
    v => {
      if (v) {
        return !!Number(v) > 0 || "Start Price should be greater than zero or is not a number";
      } else {
        return false;
      }
    }
  ]
};
