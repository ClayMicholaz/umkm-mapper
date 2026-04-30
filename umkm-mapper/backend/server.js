import app from "./app.js";
import { connectToDatabase } from "./lib/db.js";

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    console.log("✓ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("✗ MongoDB connection error:", err);
    process.exit(1);
  });
