const createConfiguratorValue = (draftType) => {
  switch (draftType) {
    case "lots":
      return "Ciima - Lots - 5 Day Auction";
      break;
    case "sets":
      return "Ciima - Sets - GTC Template";
      break;
    case "singles":
      return "Ciima - Singles - GTC Template - Flat Rate";
      break;
    case "adult":
      return "Ciima - Adult - GTC Template - Flat Rate";
    default:
      return "";
  }
  return "";
};

module.exports = { createConfiguratorValue };
