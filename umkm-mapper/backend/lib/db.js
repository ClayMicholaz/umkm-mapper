import mongoose from "mongoose";

const globalWithMongoose = globalThis;

if (!globalWithMongoose.__mongooseConnection) {
  globalWithMongoose.__mongooseConnection = {
    conn: null,
    promise: null,
  };
}

const cached = globalWithMongoose.__mongooseConnection;

export const connectToDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is required");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
