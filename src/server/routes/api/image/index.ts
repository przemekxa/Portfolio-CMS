import { FastifyPluginAsync, FastifyRequest } from "fastify";
import { v4 as uuidv4 } from "uuid";
import { Binary } from "mongodb";
import { ImageMetadata, ImageWithData } from "../../../../common/image";

const image: FastifyPluginAsync = async (fastify): Promise<void> => {
  // Get identifiers of all the images
  fastify.get("/", { preHandler: fastify.authenticated }, async (request,  reply) => {
    const images = await fastify.mongo.db
      ?.collection("image")
      .find<ImageMetadata>({}, { projection: { _id: false, data: false }})
      ?.toArray()
      ?? [];

    reply.send(images);
  });

  // Add a new image
  fastify.post("/", { preHandler: fastify.authenticated }, async (request,  reply) => {
    const file = await request.file();
    if(file) {
      const id = uuidv4()
      const mimetype = file.mimetype
      const binary = new Binary(await file.toBuffer());
      const document: ImageWithData = {id: id, mimetype: mimetype, data: binary};
      const result = await fastify.mongo.db?.collection("image").insertOne(document);
      if(result) {
        reply.send(id);
      } else {
        throw new Error("Cannot inset an image");
      }
    } else {
      throw new Error("No file")
    }
  });

  // Get an image
  fastify.get("/:id", async (request: FastifyRequest<{ Params: {id: string}}>, reply) => {
    const id = request.params.id;
    const image = await fastify.mongo.db?.collection("image").findOne<ImageWithData>({id: id});
    if(image) {
      reply
        .header("Content-Type", image.mimetype)
        .send(image.data.buffer)
    } else {
      reply.code(404).send()
    }
  });

  // Delete an image
  fastify.delete(
    "/:id", 
    { preHandler: fastify.authenticated }, 
    async (request: FastifyRequest<{ Params: { id: string }}>, reply) => {
      const id = request.params.id;
      const deleted = (await fastify.mongo.db?.collection("image").deleteOne({id: id}))?.deletedCount ?? 0;
      if(deleted == 1) {
        reply.send();
      } else {
        throw new Error("Cannot delete the image");
      }
    }
  );
};

export default image;
