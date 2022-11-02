import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import path from "path";
import handlebars from "handlebars";
import mongo from "./mongo";
import { TestModel } from "../common/collections";

const getApp = async () => {
  const app = fastify({
    logger: true,
    trustProxy: true,
    ignoreTrailingSlash: true,
  });

  // admin-panel
  app.register(fastifyStatic, {
    root: path.resolve(__dirname, "..", "..", "build"),
  });

  app.register(fastifyStatic, {
    root: path.join(__dirname, "assets"),
    prefix: "/assets/",
    decorateReply: false,
  });

  app.register(fastifyView, {
    engine: {
      handlebars: handlebars,
    },
    root: path.join(__dirname, "views"),
    options: {
      partials: {
        header: "partials/header.hbs",
        footer: "partials/footer.hbs",
      },
    },
  });

  app.get("/panel", (request, reply) => {
    return reply.sendFile("index.html");
  });

  app.get("/", (request, reply) => {
    return reply.view("/index.hbs", {
      name: "Przemek",
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });

  app.post("/test/:value", async (request, reply) => {
    const value = (request.params as any).value;
    return mongo.insertMany<TestModel>("test", [{ value }]);
  });

  app.get("/test", async (request, reply) => {
    return mongo.find<TestModel>("test");
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
