import mongoose from "mongoose";

const MONGO_URL = process.env.NEXT_MONGO_URL as string;

if (!MONGO_URL) {
  throw new Error(
    "Please define the NEXT_MONGO_URL environment variable in .env.local"
  );
}

// Extend the global object to include a custom `mongoose` property for caching
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Initialize the cache only once
global.mongoose = global.mongoose || { conn: null, promise: null };

async function connectToDatabase() {
  if (global.mongoose.conn) {
    return global.mongoose.conn;
  }

  if (!global.mongoose.promise) {
    global.mongoose.promise = mongoose
      .connect(MONGO_URL)
      .then((m) => m.connection);
  }

  global.mongoose.conn = await global.mongoose.promise;
  return global.mongoose.conn;
}

export default connectToDatabase;
