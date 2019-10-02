const fp = require("fastify-plugin");

module.exports = fp(async function(fastify, opts) {
  fastify.register(require("fastify-jwt"), {
    secret: process.env.SUPER_SECRET
  });

  fastify.decorate("authenticate", async function(request, reply) {
    try {
      //so the jwt is who the person says they are,
      await request.jwtVerify();
      //but that jwt doesnt mean they is who they is, is that where server side
      //sessions and things come into play???
    } catch (err) {
      reply.send(err);
    }
  });
});
