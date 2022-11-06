import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import fastifyView from "@fastify/view";
import autoLoad from "@fastify/autoload";
import path from "path";
import handlebars from "handlebars";

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

  app.register(autoLoad, {
    dir: path.join(__dirname, "routes"),
  });

  return app;
};

export default getApp;
