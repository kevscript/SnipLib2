// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, Db } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _mongoClientDb: Db;
}

const uri =
  process.env.NODE_ENV === "production"
    ? (process.env.MONGODB_URI_PROD as string)
    : (process.env.MONGODB_URI_DEV as string);

let client;
let mongoConnect: Promise<MongoClient>;
let db: Db;

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    db = client.db("sniplib");
    global._mongoClientPromise = client.connect();
    global._mongoClientDb = db;
  }
  mongoConnect = global._mongoClientPromise;
  db = global._mongoClientDb;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  db = client.db();
  mongoConnect = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export { mongoConnect, db };
