import { FastifyPluginAsync } from "fastify";

const panel: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return reply.sendFile("index.html");
  });
};

export default panel;
