import mongoose from "mongoose";
import dotenv from "dotenv";
import UMKM from "./models/UMKM.js";
import { mockUMKMs } from "./mockData.js";

dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/umkm-mapper";

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✓ Connected to MongoDB");

    // Clear existing data
    await UMKM.deleteMany({});
    console.log("✓ Cleared existing UMKM data");

    // Insert mock data
    const seedData = mockUMKMs.map(({ _id, ...umkm }) => umkm);
    const result = await UMKM.insertMany(seedData);
    console.log(`✓ Successfully inserted ${result.length} UMKM records`);

    // Display inserted data
    const allUMKM = await UMKM.find();
    console.log("\n📋 Data in database:");
    allUMKM.forEach((umkm, index) => {
      console.log(
        `${index + 1}. ${umkm.name} (${umkm.category}) - ${umkm.city}`,
      );
    });

    process.exit(0);
  } catch (error) {
    console.error("✗ Error seeding database:", error.message);
    process.exit(1);
  }
}

seedDatabase();
