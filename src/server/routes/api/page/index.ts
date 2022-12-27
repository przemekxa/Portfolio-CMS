import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { Page } from "../../../../common/pages";
import { getPage, setPage } from "../db";

const page: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get(
    "/:id", 
    { preHandler: fastify.authenticated }, 
    async (request: FastifyRequest<{ Params: { id: string }}>, reply) => {
      const page = await getPage(fastify.mongo, request.params.id);
      reply.send(page);
    }
  );

  fastify.post(
    "/:id", 
    { preHandler: fastify.authenticated }, 
    async (request: FastifyRequest<{ Params: { id: string }, Body: Page}>, reply) => {
      setPage(fastify.mongo, request.params.id, request.body);
    }
  );
};

export default page;
