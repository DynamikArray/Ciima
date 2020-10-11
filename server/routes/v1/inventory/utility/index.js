const {
  checkLocationCodeSchema,
} = require("../../../../schemas/v1/inventory/utility");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const {
    checkLocationCodeHandler,
  } = require("../../../../handlers/v1/inventory/utility")(fastify);

  const checkLocationCode = {
    preValidation: fastify.authenticate,
    schema: checkLocationCodeSchema,
    handler: checkLocationCodeHandler,
  };

  //http verbs
  fastify.post("/inventory/utility/checkLocationCode", checkLocationCode);
  next();
};
