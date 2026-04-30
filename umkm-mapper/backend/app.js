import "dotenv/config";
import express from "express";
import cors from "cors";
import umkmRoutes from "./routes/umkmRoutes.js";

const app = express();

const corsOrigin = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : true;

// Middleware
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

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

export default app;
