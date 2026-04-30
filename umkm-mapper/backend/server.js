import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import umkmRoutes from "./routes/umkmRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/umkm-mapper";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✓ MongoDB connected successfully"))
  .catch((err) => console.error("✗ MongoDB connection error:", err));

// Routes
app.use("/api/umkm", umkmRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "UMKM Mapper API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
