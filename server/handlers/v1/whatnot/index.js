module.exports = (fastify) => {
  const { uploadSalesFile } = require("./uploadSalesFile")(fastify);
  const { searchSalesData } = require("./searchSalesData")(fastify);

  return {
    uploadSalesFile,
    searchSalesData,
  };
};
