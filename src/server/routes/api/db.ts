import { FastifyMongoObject } from "@fastify/mongodb";
import { Footer } from "../../../common/footer";
import { Homepage } from "../../../common/homepage";
import { Menu, MenuItem } from "../../../common/menu";
import { Page, PageSummary } from "../../../common/pages";

// Menu

export const getMenu = async (mongo: FastifyMongoObject): Promise<Menu> => {
  const menu = await mongo.db?.collection("menu").find<MenuItem>({})?.toArray();
  if (menu) {
    return menu;
  } else {
    throw new Error("Menu not found");
  }
};

export const setMenu = async (mongo: FastifyMongoObject, menu: Menu) => {
  await mongo.db?.collection("menu").deleteMany({});
  await mongo.db?.collection("menu").insertMany(menu);
};

// Footer

export const getFooter = async (mongo: FastifyMongoObject): Promise<Footer> => {
  const footer = await mongo.db
    ?.collection("footer")
    .findOne<Footer>({ _id: 0 });
  if (footer) {
    return footer;
  } else {
    throw new Error("Footer not found");
  }
};

export const setFooter = async (mongo: FastifyMongoObject, footer: Footer) => {
  await mongo.db
    ?.collection("footer")
    .updateOne({ _id: 0 }, { $set: footer }, { upsert: true });
};

// Homepage

export const getHomepage = async (
  mongo: FastifyMongoObject
): Promise<Homepage> => {
  const homepage = await mongo.db
    ?.collection("homepage")
    .findOne<Homepage>({ _id: 0 });
  if (homepage) {
    return homepage;
  } else {
    throw new Error("Homepage not found");
  }
};

export const setHomepage = async (
  mongo: FastifyMongoObject,
  homepage: Homepage
) => {
  await mongo.db
    ?.collection("homepage")
    .updateOne({ _id: 0 }, { $set: homepage }, { upsert: true });
};

// Page
export const getAllPages = async (mongo: FastifyMongoObject) => {
  const collection = mongo.db?.collection<Page>("page");
  return collection?.find().toArray();
};

export const getPage = async (
  mongo: FastifyMongoObject,
  id: string
): Promise<Page> => {
  const page = await mongo.db?.collection("page").findOne<Page>({ id: id });
  if (page) {
    return page;
  } else {
    throw new Error("Page not found");
  }
};

export const setPage = async (
  mongo: FastifyMongoObject,
  id: string,
  page: Page
) => {
  const result = await mongo.db
    ?.collection("page")
    .updateOne({ id: id }, { $set: page }, { upsert: true });
  if (
    !result ||
    !(
      result.modifiedCount == 1 ||
      result.upsertedCount == 1 ||
      result.matchedCount == 1
    )
  ) {
    throw new Error("Cannot upsert page");
  }
};

// Subpages

export const getSubpages = async (
  mongo: FastifyMongoObject,
  subpages: string[]
): Promise<PageSummary[]> => {
  if (subpages.length === 0) {
    return [];
  }

  return (
    (await mongo.db
      ?.collection("page")
      .aggregate<PageSummary>([
        {
          $match: {
            id: { $in: subpages },
          },
        },
        {
          $project: {
            _id: 0,
            subpages: 0,
            sections: 0,
          },
        },
        {
          $addFields: {
            __order: {
              $indexOfArray: [subpages, "$id"],
            },
          },
        },
        {
          $sort: {
            __order: 1,
          },
        },
        {
          $project: {
            __order: 0,
          },
        },
      ])
      .toArray()) ?? []
  );
};
