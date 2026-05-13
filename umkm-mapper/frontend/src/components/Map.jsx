import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import UMKMService from "../services/umkmService";
import Sidebar from "./Sidebar";
import MapHeader from "./MapHeader";
import "./Map.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const Map = () => {
  const [umkms, setUmkms] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  // Center of Indonesia (approximate)
  const initialCenter = [-2.5489, 113.9213];
  const initialZoom = 5;

  useEffect(() => {
    fetchCategories();
    fetchUMKMs();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await UMKMService.getCategories();
      setCategories(["Semua", ...data]);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchUMKMs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== "Semua") params.category = selectedCategory;
      if (selectedCity) params.city = selectedCity;
      if (searchTerm) params.search = searchTerm;

      const data = await UMKMService.getAllUMKM(params);
      setUmkms(data);
    } catch (error) {
      console.error("Error fetching UMKMs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUMKMs();
  }, [selectedCategory, selectedCity, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="map-container">
      <MapHeader onSearch={handleSearch} />
      <div className="map-wrapper">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onCityChange={handleCityChange}
          selectedCity={selectedCity}
          umkmsCount={umkms.length}
          loading={loading}
        />
        <MapContainer
          center={initialCenter}
          zoom={initialZoom}
          ref={mapRef}
          className="map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {umkms.map((umkm) => (
            <Marker
              key={umkm._id}
              position={[
                umkm.location.coordinates[1],
                umkm.location.coordinates[0],
              ]}
            >
              <Popup>
                <div className="popup-content">
                  <h3>{umkm.name}</h3>
                  <p>
                    <strong>Kategori:</strong> {umkm.category}
                  </p>
                  <p>
                    <strong>Alamat:</strong> {umkm.address}
                  </p>
                  <p>
                    <strong>Kota:</strong> {umkm.city}
                  </p>
                  {umkm.rating !== undefined && (
                    <p>
                      <strong>Rating:</strong> {umkm.rating}{" "}
                      {umkm.reviews !== undefined && `(${umkm.reviews} ulasan)`}
                    </p>
                  )}
                  {umkm.phone && (
                    <p>
                      <strong>Telepon:</strong> {umkm.phone}
                    </p>
                  )}
                  {umkm.whatsapp && (
                    <p>
                      <strong>WhatsApp:</strong> {umkm.whatsapp}
                    </p>
                  )}
                  {umkm.website && (
                    <p>
                      <a
                        href={umkm.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Kunjungi Website
                      </a>
                    </p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
