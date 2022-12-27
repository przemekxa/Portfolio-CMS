import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { Footer } from "../../../../common/footer";
import { getFooter, setFooter } from "../db";

const footer: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", { preHandler: fastify.authenticated }, async (request, reply) => {
    const footer = await getFooter(fastify.mongo);
    reply.send(footer);
  });

  fastify.post(
    "/", 
    { preHandler: fastify.authenticated }, 
    async (request: FastifyRequest<{ Body: Footer }>, reply) => {
      await setFooter(fastify.mongo, request.body);
    }
  );
};

export default footer;
