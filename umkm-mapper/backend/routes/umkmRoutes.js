import express from "express";
import {
  getAllUMKM,
  getUMKMById,
  getNearbyUMKM,
  getUMKMByLocation,
  getCategories,
  getCities,
  createUMKM,
  updateUMKM,
  deleteUMKM,
} from "../controllers/umkmController.js";

const router = express.Router();

// GET routes
router.get("/", getAllUMKM);
router.get("/categories", getCategories);
router.get("/cities", getCities);
router.get("/nearby", getNearbyUMKM);
router.get("/location", getUMKMByLocation);
router.get("/:id", getUMKMById);

// POST route
router.post("/", createUMKM);

// PUT route
router.put("/:id", updateUMKM);

// DELETE route
router.delete("/:id", deleteUMKM);

export default router;
