export const fieldRules = {
  targetValue: [
    v => !!v || "Target Value is a required field",
    v => !!Number(v) > 0 || "Target Value must be greater than zero or is not a number"
  ]
};
