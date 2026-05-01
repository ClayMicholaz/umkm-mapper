import app from "../backend/app.js";
import { connectToDatabase } from "../backend/lib/db.js";

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    // Call the Express app and catch any errors it emits.
    return await new Promise((resolve) => {
      try {
        app(req, res, (err) => {
          if (err) {
            console.error("Express handler error:", err);
            try {
              res.statusCode = 500;
              res.setHeader("content-type", "application/json");
              res.end(JSON.stringify({ error: err.message }));
            } catch (e) {
              console.error("Error sending error response:", e);
            }
          }
          resolve();
        });
      } catch (err) {
        console.error("Synchronous error while invoking app:", err);
        try {
          res.statusCode = 500;
          res.setHeader("content-type", "application/json");
          res.end(JSON.stringify({ error: err.message }));
        } catch (e) {
          console.error("Error sending crash response:", e);
        }
        resolve();
      }
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return res.status(500).json({ error: "Database connection failed" });
  }
}
