import { FastifyPluginAsync } from "fastify";

const index: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return reply.view("/index.hbs", {
      name: "Przemek",
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });
};

export default index;
