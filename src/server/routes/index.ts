import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { getFooter, getHomepage, getMenu, getPage, getSubpages } from "./api/db";
import { PageSummary } from "../../common/pages"

const index: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", async (_, reply) => {
    let footer = await getFooter(fastify.mongo);
    let menu = await getMenu(fastify.mongo);
    let homepage = await getHomepage(fastify.mongo);

    return reply.view("/index.hbs", {
      title: homepage.title,
      menu: menu,
      backgroundImage: homepage.backgroundImage,
      typingText: {
        title: homepage.typingTitle,
        items: homepage.typingItems,
      },
      footer: footer,
    });
  });

  fastify.get("/:id", async (request: FastifyRequest<{ Params: { id: string }}>, reply) => {
    try {
      let page = await getPage(fastify.mongo, request.params.id);
      let footer = await getFooter(fastify.mongo);
      let menu = await getMenu(fastify.mongo);

      let subpages: PageSummary[] = (await getSubpages(fastify.mongo, page.subpages)).map(subpage => {
        let description = subpage.description
        if(description.length >= 100) {
          description = description.substring(0, 100) + "…"
        }
        return {
          id: subpage.id,
          description: description,
          backgroundImage: subpage.backgroundImage,
          title: subpage.title
        }
      })
  
      return reply.view("/page.hbs", {
        title: page.title,
        description: page.description,
        backgroundImage: page.backgroundImage,
        subpages: subpages,
        sections: page.sections,
        menu: menu,
        footer: footer,
      });
    } catch (error) {
      reply.status(404).send()
      return
    }
  });
};

export default index;
