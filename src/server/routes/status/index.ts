import { FastifyPluginAsync } from "fastify";

// azure
const status: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/ready", async (request, reply) => {
    return reply.code(200).send();
  });

  fastify.get("/health", async (request, reply) => {
    return reply.code(200).send();
  });
};

export default status;
