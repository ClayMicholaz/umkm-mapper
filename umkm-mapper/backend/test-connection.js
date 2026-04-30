import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Testing MongoDB Atlas connection...");
console.log("Connection string:", MONGODB_URI.replace(/:[^:/@]+@/, ":****@"));

const options = {
  serverSelectionTimeoutMS: 5000,
  family: 4, // Force IPv4
};

mongoose
  .connect(MONGODB_URI, options)
  .then(() => {
    console.log("✓ Successfully connected to MongoDB Atlas!");
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((err) => {
    console.error("✗ Connection failed:", err.message);
    console.error("Full error:", err);
    process.exit(1);
  });
