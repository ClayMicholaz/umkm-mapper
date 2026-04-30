import UMKM from "../models/UMKM.js";
import { mockUMKMs, filterMockData } from "../mockData.js";

// Use mock data instead of MongoDB for now
const USE_MOCK_DATA = false;

// Get all UMKM or filter by category
export const getAllUMKM = async (req, res) => {
  try {
    const { category, city, search } = req.query;

    if (USE_MOCK_DATA) {
      const filtered = filterMockData(category, city, search);
      return res.json(filtered);
    }

    let filter = {};
    if (category && category !== "Semua") {
      filter.category = category;
    }
    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const umkms = await UMKM.find(filter).limit(100);
    res.json(umkms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get UMKM by ID
export const getUMKMById = async (req, res) => {
  try {
    const { id } = req.params;
    const umkm = await UMKM.findById(id);
    if (!umkm) {
      return res.status(404).json({ error: "UMKM not found" });
    }
    res.json(umkm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get nearby UMKM by geolocation
export const getNearbyUMKM = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 50000, category } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({ error: "Longitude and latitude required" });
    }

    let filter = {
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: parseInt(maxDistance),
        },
      },
    };

    if (category && category !== "Semua") {
      filter.category = category;
    }

    const umkms = await UMKM.find(filter).limit(50);
    res.json(umkms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get UMKM by city and category
export const getUMKMByLocation = async (req, res) => {
  try {
    const { city, category } = req.query;
    let filter = {};

    if (city) {
      filter.city = { $regex: city, $options: "i" };
    }
    if (category && category !== "Semua") {
      filter.category = category;
    }

    const umkms = await UMKM.find(filter).limit(100);
    res.json(umkms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    if (USE_MOCK_DATA) {
      const categories = [...new Set(mockUMKMs.map((u) => u.category))].sort();
      return res.json(categories);
    }

    const categories = await UMKM.distinct("category");
    res.json(categories.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cities
export const getCities = async (req, res) => {
  try {
    if (USE_MOCK_DATA) {
      const cities = [...new Set(mockUMKMs.map((u) => u.city))].sort();
      return res.json(cities);
    }

    const cities = await UMKM.distinct("city");
    res.json(cities.sort());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new UMKM (for admin)
export const createUMKM = async (req, res) => {
  try {
    const umkm = new UMKM(req.body);
    await umkm.save();
    res.status(201).json(umkm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update UMKM (for admin)
export const updateUMKM = async (req, res) => {
  try {
    const { id } = req.params;
    const umkm = await UMKM.findByIdAndUpdate(id, req.body, { new: true });
    if (!umkm) {
      return res.status(404).json({ error: "UMKM not found" });
    }
    res.json(umkm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete UMKM (for admin)
export const deleteUMKM = async (req, res) => {
  try {
    const { id } = req.params;
    const umkm = await UMKM.findByIdAndDelete(id);
    if (!umkm) {
      return res.status(404).json({ error: "UMKM not found" });
    }
    res.json({ message: "UMKM deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
