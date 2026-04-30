import React, { useState } from "react";
import "./MapHeader.css";

const MapHeader = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value);
  };

  return (
    <div className="map-header">
      <div className="header-content">
        <h1>📍 UMKM Mapper Indonesia</h1>
        <p>Temukan UMKM lokal di sekitar Anda</p>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari UMKM, produk, atau layanan..."
          value={searchInput}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default MapHeader;
