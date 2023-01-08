import { FastifyPluginAsync, FastifyRequest } from "fastify";

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post(
    "/login",
    async (
      request: FastifyRequest<{
        Body: { username?: string; password?: string };
      }>,
      reply
    ) => {
      if (
        request.body.username === process.env.ADMIN_PANEL_USERNAME &&
        request.body.password === process.env.ADMIN_PANEL_PASSWORD
      ) {
        request.session.authenticated = true;
        reply.code(200);
      } else {
        reply.code(401);
      }
    }
  );

  fastify.post(
    "/logout",
    { preHandler: fastify.authenticated },
    async (request, reply) => {
      request.session.authenticated = false;
      reply.code(200).send();
    }
  );
};

export default auth;
