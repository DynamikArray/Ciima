const { analyticsSearchSchema } = require("../../../schemas/v1/analytics");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const { analyticsSearchHandler } = require("../../../handlers/v1/analytics")(
    fastify
  );

  const analyticsSearch = {
    preValidation: fastify.authenticate,
    schema: analyticsSearchSchema,
    handler: analyticsSearchHandler,
  };
  fastify.get("/analytics", analyticsSearch);
  next();
};
