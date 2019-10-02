const {
  loginSchema,
  registerSchema,
  accountSchema
} = require("../../../schemas/v1/user");
/**
 * Info routes endpoints
 *
 * @param {Fastify} fastify
 */
module.exports = function(fastify, opts, next) {
  const { register, login, account } = require("../../../handlers/v1/user")(
    fastify
  );

  const registerConfig = {
    schema: registerSchema,
    handler: register
  };

  const loginConfig = {
    schema: loginSchema,
    handler: login
  };

  const accountConfig = {
    preValidation: fastify.authenticate,
    schema: accountSchema,
    handler: account
  };

  fastify.post("/user/register", registerConfig);
  fastify.post("/user/login", loginConfig);
  fastify.post("/user/account", accountConfig);

  next();
};
