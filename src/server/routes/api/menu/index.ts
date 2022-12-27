import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { MenuItem } from "../../../../common/menu";
import { getMenu, setMenu } from "../db";

const menu: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", { preHandler: fastify.authenticated }, async (request, reply) => {
    const menu = await getMenu(fastify.mongo);
    reply.send(menu);
  });

  fastify.post(
    "/",
    { preHandler: fastify.authenticated },
    async (request: FastifyRequest<{ Body: MenuItem[] }>, reply) => {
      await setMenu(fastify.mongo, request.body);
    }
  );
};

export default menu;
