/**
 * repriceItemStrategy - handles repricing item based on our simple algo
 *
 *   Items will not get priced lower than 14.99
 *
 * @param  Number price price of item
 * @return Number       New price or false
 */
const REPRICE_PERCENTAGE = 0.1;

const repriceItemStrategy = (price) => {
  if (isNaN(price)) return false;
  let newPrice = false;
  if (price > 14.99) {
    newPrice = Number(price).toFixed(2) - Number(price * REPRICE_PERCENTAGE).toFixed(2);

    if (newPrice >= 14.99) return Number(newPrice.toFixed(2));
    if (newPrice <= 14.99) return Number(14.99);
  }
  return false;
};

module.exports = { repriceItemStrategy };
