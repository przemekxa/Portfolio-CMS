import {
  MongoClient,
  Document,
  Filter,
  WithId,
  OptionalUnlessRequiredId,
} from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI env variable is not set.");
}

const client = new MongoClient(process.env.MONGO_URI);
const database = client.db("portfolio-cms");

async function insertMany<T extends Document>(
  collectionName: string,
  values: OptionalUnlessRequiredId<T>[]
) {
  const collection = database.collection<T>(collectionName);
  return collection.insertMany(values);
}

async function find<T extends Document>(
  collectionName: string,
  filter?: Filter<T>
) {
  let result: WithId<T>[] = [];
  const collection = database.collection<T>(collectionName);
  const cursor = filter ? collection.find(filter) : collection.find();

  await cursor.forEach((document) => {
    result.push(document);
  });

  return result;
}

const mongo = { find, insertMany };
export default mongo;
