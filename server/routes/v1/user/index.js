const {
  loginSchema,
  registerSchema,
  accountSchema,
  updateSchema,
} = require("../../../schemas/v1/user");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function (fastify, opts, next) {
  const {
    register,
    login,
    account,
    update,
  } = require("../../../handlers/v1/user")(fastify);

  const registerConfig = {
    schema: registerSchema,
    handler: register,
  };

  const loginConfig = {
    schema: loginSchema,
    handler: login,
  };

  const accountConfig = {
    preValidation: fastify.authenticate,
    schema: accountSchema,
    handler: account,
  };

  const updateRoute = {
    preValidation: fastify.authenticate,
    schema: updateSchema,
    handler: update,
  };
  fastify.post("/user/update", updateRoute);

  fastify.post("/user/register", registerConfig);
  fastify.post("/user/login", loginConfig);
  fastify.post("/user/account", accountConfig);

  next();
};
