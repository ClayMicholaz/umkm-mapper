import mongoose from "mongoose";

const umkmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
      "FnB",
      "Otomotif",
      "Teknologi",
      "Fashion",
      "Kerajinan",
      "Pertanian",
      "Jasa",
      "Retail",
      "Lainnya",
    ],
    index: true,
  },
  description: {
    type: String,
    trim: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    index: true,
  },
  province: {
    type: String,
    required: true,
    index: true,
  },
  phone: String,
  whatsapp: String,
  website: String,
  email: String,
  owner: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  reviews: {
    type: Number,
    default: 0,
  },
  imageUrl: String,
  hours: {
    open: String,
    close: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create geospatial index for location queries
umkmSchema.index({ location: "2dsphere" });
umkmSchema.index({ category: 1 });
umkmSchema.index({ city: 1 });

const UMKM = mongoose.model("UMKM", umkmSchema);

export default UMKM;
