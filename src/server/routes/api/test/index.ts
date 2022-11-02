import { FastifyPluginAsync } from "fastify";
import mongo from "../../../mongo";
import { TestModel } from "../../../../common/collections";

const test: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post("/:value", async (request, reply) => {
    const value = (request.params as any).value;
    return mongo.insertMany<TestModel>("test", [{ value }]);
  });

  fastify.get("/", async (request, reply) => {
    return mongo.find<TestModel>("test");
  });

  fastify.get("/:value", async (request, reply) => {
    return mongo.find<TestModel>("test", {
      value: { $eq: (request.params as any).value },
    });
  });
};

export default test;
