import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import autoLoad from "@fastify/autoload";
import path from "path";
import handlebars from "handlebars";

declare module "fastify" {
  interface Session {
      authenticated: boolean
  }

  interface FastifyInstance {
    authenticated: (request: FastifyRequest, response: FastifyReply) => Promise<void>
  }
}

handlebars.registerHelper("eq", (context, options) => {
  return context === options;
})

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

  // Handlebars
  app.register(fastifyView, {
    engine: {
      handlebars: handlebars,
    },
    root: path.join(__dirname, "views"),
    options: {
      partials: {
        head: "partials/head.hbs",
        header: "partials/header.hbs",
        footer: "partials/footer.hbs",
        sections: "partials/sections.hbs",
      },
    },
  });

  // Routes
  app.register(autoLoad, {
    dir: path.join(__dirname, "routes"),
  });

  // Authentication
  app.register(fastifyCookie);
  app.register(fastifySession, {
    secret: "Vv6ZPSeui5PN14vxZYAui4L1blNqirzO/a/ZLgR783/CFs8VafGAgLi6tuL500F1",
    cookie: {
      secure: false,
    },
  });
  app.decorate("authenticated", async (request: FastifyRequest, reply: FastifyReply) => {
    if (request.session.authenticated !== true) {
      reply.status(401).send();
    }
  });

  return app;
};

export default getApp;
