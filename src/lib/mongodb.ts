import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/bangla-news-24";

declare global {
  var _mongoClient: MongoClient | undefined;
}

const client: MongoClient = global._mongoClient || new MongoClient(uri);

if (process.env.NODE_ENV === "development") {
  global._mongoClient = client;
}

export const getDb = (): Db => client.db("bangla-news-24");
export { client };
export default client;
