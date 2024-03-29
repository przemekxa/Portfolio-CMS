import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { Page } from "../../../../common/pages";
import { deletePage, getAllPageSummaries, getPage, setPage } from "../db";

const page: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", { preHandler: fastify.authenticated }, async (req, res) => {
    const pages = await getAllPageSummaries(fastify.mongo);
    return pages;
  });

  fastify.get(
    "/:id",
    { preHandler: fastify.authenticated },
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const page = await getPage(fastify.mongo, request.params.id);
      reply.send(page);
    }
  );

  fastify.post(
    "/:id",
    { preHandler: fastify.authenticated },
    async (
      request: FastifyRequest<{ Params: { id: string }; Body: Page }>,
      reply
    ) => {
      setPage(fastify.mongo, request.params.id, request.body);
    }
  );

  fastify.delete(
    "/:id",
    { preHandler: fastify.authenticated },
    async (req: FastifyRequest<{ Params: { id: string } }>, res) => {
      deletePage(fastify.mongo, req.params.id);
    }
  );
};

export default page;
