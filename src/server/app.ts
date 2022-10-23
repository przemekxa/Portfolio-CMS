import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import path from "path";
import handlebars from "handlebars";

const getApp = async () => {
  const app = fastify({
    logger: true,
    trustProxy: true,
    ignoreTrailingSlash: true,
  });

  app.register(fastifyStatic, {
    root: path.resolve(__dirname, "..", "..", "build"),
  });

  app.register(fastifyView, {
    engine: {
      handlebars: handlebars,
    },
    root: path.join(__dirname, "views"),
  });

  app.get("/panel", (request, reply) => {
    return reply.sendFile("index.html");
  });

  app.get("/", (request, reply) => {
    return reply.view("/index.hbs", { name: "Przemek" });
  });

  // azure
  app.get("/api/status/health", (requst, reply) => {
    reply.code(200).send();
  });

  app.get("/api/status/ready", (requst, reply) => {
    reply.code(200).send();
  });

  return app;
};

export default getApp;
