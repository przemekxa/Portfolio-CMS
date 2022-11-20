import { FastifyPluginAsync, FastifyRequest } from "fastify";

const index: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return reply.view("/index.hbs", {
      title: "Home page",
      menu: [
        {
          title: "Home",
          href: "/"
        },
        {
          title: "Works",
          href: "/works"
        },
        {
          title: "About Me",
          href: "/about"
        },
        {
          title: "Contact",
          href: "/contact"
        }
      ],
      backgroundImage: "/assets/images/space.jpg",
      typingText: {
        title: "Hello,",
        items: [
          "I'm James Dean",
          "French Designer",
          "Working as a Freelance",
        ],
      },
      sections: [
        {
          type: "paragraph",
          contents: "<p>Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies, nisl nunc pulvinar ligula, id sodales arcu sapien in nisi. Quisque libero enim, mattis non augue posuere, venenatis dapibus urna.</p>",
        },
        {
          type: "1image",
          title: "Menphis skyline 1",
          src: "/assets/images/work001-04.jpg",
        },
      ],
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });

  fastify.get("/works", async (request, reply) => {
    return reply.view("/page.hbs", {
      title: "Works",
      description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies, nisl nunc pulvinar ligula, id sodales arcu sapien in nisi. Quisque libero enim, mattis non augue posuere, venenatis dapibus urna.",
      backgroundImage: "/assets/images/work001-01.jpg",
      subpages: [
        {
          title: "Fringilla sit amet",
          description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
          backgroundImage: "/assets/images/work01-hover.jpg",
          href: `/work/${Buffer.from("001/022").toString('base64')}`
        },
        {
          title: "Fringilla sit amet",
          description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
          backgroundImage: "/assets/images/work02-hover.jpg",
          href: `/work/${Buffer.from("002/022").toString('base64')}`
        },
        {
          title: "Fringilla sit amet",
          description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
          backgroundImage: "/assets/images/work03-hover.jpg",
          href: `/work/${Buffer.from("003/022").toString('base64')}`
        },
        {
          title: "Fringilla sit amet",
          description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
          backgroundImage: "/assets/images/work03-hover.jpg",
          href: `/work/${Buffer.from("004/022").toString('base64')}`
        },
        {
          title: "Fringilla sit amet",
          description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
          backgroundImage: "/assets/images/work02-hover.jpg",
          href: `/work/${Buffer.from("005/022").toString('base64')}`
        },
        {
          title: "Fringilla sit amet",
          description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
          backgroundImage: "/assets/images/work01-hover.jpg",
          href: `/work/${Buffer.from("006/022").toString('base64')}`
        },
      ],
      sections: [
        {
          type: "pageHeader",
          showCard: false,
        },
        {
          type: "paragraph",
          contents: "<p>Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies, nisl nunc pulvinar ligula, id sodales arcu sapien in nisi. Quisque libero enim, mattis non augue posuere, venenatis dapibus urna.</p>",
        },
        {
          type: "subpageCarousel",
        },
      ],
      menu: [
        {
          title: "Home",
          href: "/"
        },
        {
          title: "Works",
          href: "/works"
        },
        {
          title: "About Me",
          href: "/about"
        },
        {
          title: "Contact",
          href: "/contact"
        }
      ],
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });

  fastify.get("/work/:workIdBase64", async (request: FastifyRequest<{ Params: { workIdBase64: string }}>, reply) => {
    const { workIdBase64 } = request.params;
    const workId = Buffer.from(workIdBase64, 'base64').toString('utf-8');

    return reply.view("/page.hbs", {
      title: `Work ${workId}`,
      description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies, nisl nunc pulvinar ligula, id sodales arcu sapien in nisi. Quisque libero enim, mattis non augue posuere, venenatis dapibus urna.",
      backgroundImage: "/assets/images/work001-01.jpg",
      sections: [
        {
          type: "pageHeader",
          showCard: true,
        },
        {
          type: "2images",
          images: [
            {
              title: "Menphis skyline 1",
              src: "/assets/images/work001-02.jpg",
            },
            {
              title: "Menphis skyline 2",
              src: "/assets/images/work001-03.jpg",
            },
          ]
        },
        {
          "type": "header",
          "header": "Big Header",
        },
        {
          type: "paragraph",
          contents: "<p>Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies, nisl nunc pulvinar ligula, id sodales arcu sapien in nisi. Quisque libero enim, mattis non augue posuere, venenatis dapibus urna.</p>",
        },
        {
          type: "1image",
          title: "Menphis skyline 1",
          src: "/assets/images/work001-04.jpg",
        },
      ],
      menu: [
        {
          title: "Home",
          href: "/"
        },
        {
          title: "Works",
          href: "/works"
        },
        {
          title: "About Me",
          href: "/about"
        },
        {
          title: "Contact",
          href: "/contact"
        }
      ],
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });

  fastify.get("/about", async (request, reply) => {
    return reply.view("/page.hbs", {
      title: "About Me",
      subpages: [],
      sections: [
        {
          type: "pageHeader",
          showCard: false,
        },
        {
          type: "paragraphImage",
          paragraph: "<h3>Consectetur adipiscing elit</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luctus at sem quis varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras ultrices hendrerit nisl.</p><h3>Ut enim ad minim </h3><p>Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum. <h3>Maecenas luctus at sem quis varius</h3><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus iaculis magna sagittis elit sagittis, at hendrerit lorem venenatis. Morbi accumsan iaculis blandit. Cras ultrices hendrerit nisl.</p>",
          image: "/assets/images/profil.jpg",
        },
      ],
      menu: [
        {
          title: "Home",
          href: "/"
        },
        {
          title: "Works",
          href: "/works"
        },
        {
          title: "About Me",
          href: "/about"
        },
        {
          title: "Contact",
          href: "/contact"
        }
      ],
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });

  fastify.get("/contact", async (request, reply) => {
    return reply.view("/page.hbs", {
      title: `Contact Me`,
      subpages: [],
      menu: [
        {
          title: "Home",
          href: "/"
        },
        {
          title: "Works",
          href: "/works"
        },
        {
          title: "About Me",
          href: "/about"
        },
        {
          title: "Contact",
          href: "/contact"
        }
      ],
      sections: [
        {
          type: "pageHeader",
          showCard: false,
        },
        {
          type: "contact",
          contact: {
            phone: "+48 123 456 789",
            email: "a@b.pl",
            address: "44 rue Moulbert 75016 Paris",
          },
          socialHeader: "Follow me on social media",
          social: [
            {
              icon: "facebook",
              href: "http://www.facebook.com"
            },
            {
              icon: "twitter",
              href: "http://www.twitter.com"
            },
            {
              icon: "linkedin",
              href: "http://www.linkedin.com"
            },
          ],
        },
      ],
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });
};

export default index;
