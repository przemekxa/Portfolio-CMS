import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import fastifySession from "@fastify/session";
import fastifyCookie from "@fastify/cookie";
import autoLoad from "@fastify/autoload";
import path from "path";
import handlebars from "handlebars";
import mongo from "@fastify/mongodb";
import multipart from "@fastify/multipart";

declare module "fastify" {
  interface Session {
      authenticated: boolean
  }

  interface FastifyInstance {
    authenticated: (request: any, reply: any) => Promise<void>
  }
}

handlebars.registerHelper("eq", (context, options) => {
  return context === options;
});

handlebars.registerHelper("chunked", (context: [any], options: number) => {
  let chunked = [];
  for(let i = 0; i < context.length; i += options) {
    chunked.push(context.slice(i, i + options));
  }
  return chunked;
});

const getApp = async () => {
  const app = fastify({
    logger: true,
    trustProxy: true,
    ignoreTrailingSlash: true,
  });

  // Multipart - receiving files
  app.register(multipart);

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
  app.decorate("authenticated", async (request: any, reply: any) => {
    if (request.session.authenticated !== true) {
      reply.status(401).send();
    }
  });

  // Mongo
  app.register(mongo, {
    forceClose: true,
    url: 'mongodb+srv://admin:admin@portfolio-cms.ofy2npz.mongodb.net/portfolio-cms'
  });

  return app;
};

export default getApp;
