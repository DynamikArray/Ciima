/**
 * repriceItemStrategy - handles repricing item based on our simple algo
 *
 *   Items will not get priced lower than 14.99
 *
 * @param  Number price price of item
 * @return Number       New price or false
 */
const repriceItemStrategy = price => {
  if (isNaN(price)) return false;
  let newPrice = false;
  if (price > 14.99) {
    newPrice = price - 2.5;
    if (newPrice >= 14.99) return newPrice;
    if (newPrice <= 14.99) return 14.99;
  }
  return newPrice;
};

module.exports = { repriceItemStrategy };
