const fieldNames = ["displayName", "displayColor"];

const fieldRules = {
  displayName: [
    v => v.length <= 50 || "Display Name should be less than 50 characters"
  ],
  displayColor: [
    v => v.length <= 50 || "Display Color should be less than 50 characters"
  ]
};

module.exports = { fieldNames, fieldRules };
