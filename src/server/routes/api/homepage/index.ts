import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { Homepage } from "../../../../common/homepage";
import { getHomepage, setHomepage } from "../db";

const homepage: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", { preHandler: fastify.authenticated }, async (request, reply) => {
    const homepage = await getHomepage(fastify.mongo);
    reply.send(homepage);
  });

  fastify.post(
    "/", 
    { preHandler: fastify.authenticated },
    async (request: FastifyRequest<{ Body: Homepage }>, reply) => {
      await setHomepage(fastify.mongo, request.body);
    }
  );
};

export default homepage;
