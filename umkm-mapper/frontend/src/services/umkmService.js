import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const umkmService = {
  getAllUMKM: (params = {}) => {
    return axios
      .get(`${API_BASE_URL}/umkm`, { params })
      .then((res) => res.data);
  },

  getUMKMById: (id) => {
    return axios.get(`${API_BASE_URL}/umkm/${id}`).then((res) => res.data);
  },

  getNearbyUMKM: (longitude, latitude, maxDistance = 50000, category) => {
    const params = { longitude, latitude, maxDistance };
    if (category && category !== "Semua") params.category = category;
    return axios
      .get(`${API_BASE_URL}/umkm/nearby`, { params })
      .then((res) => res.data);
  },

  getUMKMByLocation: (city, category) => {
    const params = { city };
    if (category && category !== "Semua") params.category = category;
    return axios
      .get(`${API_BASE_URL}/umkm/location`, { params })
      .then((res) => res.data);
  },

  getCategories: () => {
    return axios.get(`${API_BASE_URL}/umkm/categories`).then((res) => res.data);
  },

  getCities: () => {
    return axios.get(`${API_BASE_URL}/umkm/cities`).then((res) => res.data);
  },

  createUMKM: (data) => {
    return axios.post(`${API_BASE_URL}/umkm`, data).then((res) => res.data);
  },

  updateUMKM: (id, data) => {
    return axios
      .put(`${API_BASE_URL}/umkm/${id}`, data)
      .then((res) => res.data);
  },

  deleteUMKM: (id) => {
    return axios.delete(`${API_BASE_URL}/umkm/${id}`).then((res) => res.data);
  },
};

export default umkmService;
