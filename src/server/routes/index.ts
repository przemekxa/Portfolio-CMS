import { FastifyPluginAsync } from "fastify";

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
      backgroundImage: "./assets/images/space.jpg",
      typingText: {
        title: "Hello,",
        items: [
          "I'm James Dean",
          "French Designer",
          "Working as a Freelance",
        ],
      },
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });

  fastify.get("/works", async (request, reply) => {
    return reply.view("/works.hbs", {
      title: "Works",
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
      description: "<p>Nulla <b>facilisi</b>. Vivamus vestibulum, elit in scelerisque ultricies, nisl nunc pulvinar ligula, id sodales arcu sapien in nisi. Quisque libero enim, mattis non augue posuere, venenatis dapibus urna.</p>",
      works: [
        [
          {
            number: "001/022",
            title: "Fringilla sit amet",
            description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
            image: "./assets/images/work01-hover.jpg",
            href: "/"
          },
          {
            number: "002/022",
            title: "Fringilla sit amet",
            description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
            image: "./assets/images/work02-hover.jpg",
            href: "/"
          },
          {
            number: "003/022",
            title: "Fringilla sit amet",
            description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
            image: "./assets/images/work03-hover.jpg",
            href: "/"
          }
        ],
        [
          {
            number: "004/022",
            title: "Fringilla sit amet",
            description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
            image: "./assets/images/work03-hover.jpg",
            href: "/"
          },
          {
            number: "005/022",
            title: "Fringilla sit amet",
            description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
            image: "./assets/images/work02-hover.jpg",
            href: "/"
          },
          {
            number: "006/022",
            title: "Fringilla sit amet",
            description: "Nulla facilisi. Vivamus vestibulum, elit in scelerisque ultricies.",
            image: "./assets/images/work01-hover.jpg",
            href: "/"
          }
        ]
      ],
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });

  fastify.get("/about", async (request, reply) => {
    return reply.view("/about.hbs", {
      title: "About Me",
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
      contents: "<h3>Consectetur adipiscing elit</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas luctus at sem quis varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras ultrices hendrerit nisl.</p><h3>Ut enim ad minim </h3><p>Duis aute irure dolor in reprehenderit in voluptate velit essecillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum. <h3>Maecenas luctus at sem quis varius</h3><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus iaculis magna sagittis elit sagittis, at hendrerit lorem venenatis. Morbi accumsan iaculis blandit. Cras ultrices hendrerit nisl.</p>",
      profileImage: "./assets/images/profil.jpg",
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });

  fastify.get("/contact", async (request, reply) => {
    return reply.view("/contact.hbs", {
      title: "Contact Me",
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
      footer: {
        copyright: "some copyrigh text",
      },
    });
  });
};

export default index;