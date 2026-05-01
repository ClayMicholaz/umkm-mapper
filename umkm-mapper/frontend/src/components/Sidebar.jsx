import React, { useEffect, useMemo, useRef, useState } from "react";
import "./Sidebar.css";

const Sidebar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  onCityChange,
  selectedCity,
  umkmsCount,
  loading,
}) => {
  const [citySearch, setCitySearch] = useState(selectedCity);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const citySearchRef = useRef(null);

  const cities = [
    "Jakarta",
    "Surabaya",
    "Bandung",
    "Medan",
    "Semarang",
    "Makassar",
    "Palembang",
    "Yogyakarta",
    "Malang",
    "Tangerang",
  ];

  const filteredCities = useMemo(() => {
    const searchValue = citySearch.trim().toLowerCase();

    if (!searchValue) {
      return cities;
    }

    return cities.filter((city) => city.toLowerCase().includes(searchValue));
  }, [citySearch]);

  const handleCityInputChange = (e) => {
    const value = e.target.value;
    setCitySearch(value);
    setCityDropdownOpen(true);
    onCityChange("");
  };

  const handleCitySelect = (city) => {
    setCitySearch(city);
    setCityDropdownOpen(false);
    onCityChange(city);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        citySearchRef.current &&
        !citySearchRef.current.contains(event.target)
      ) {
        setCityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const handleViewportChange = () => {
      setIsMobile(mobileQuery.matches);
    };

    handleViewportChange();
    mobileQuery.addEventListener("change", handleViewportChange);

    return () => {
      mobileQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        {/* Category Filter */}
        <div className="filter-group">
          <h3>Kategori</h3>
          {isMobile ? (
            <div className="category-select-wrapper">
              <select
                className="category-select"
                value={selectedCategory}
                aria-label="Kategori"
                onChange={(e) => onCategoryChange(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {isMobile && category === "Semua"
                      ? "Semua Kategori"
                      : category}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="category-list">
              {categories.map((category) => (
                <label key={category} className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                  />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* City Filter */}
        <div className="filter-group">
          <h3>Kota</h3>
          <div className="city-search-wrapper" ref={citySearchRef}>
            <input
              type="text"
              value={citySearch}
              aria-label="Kota"
              onChange={handleCityInputChange}
              onFocus={() => setCityDropdownOpen(true)}
              placeholder="Pilih Kota"
              className="city-search-input"
            />

            {cityDropdownOpen && (
              <div className="city-dropdown">
                <button
                  type="button"
                  className="city-dropdown-option city-dropdown-clear"
                  onClick={() => handleCitySelect("")}
                >
                  Semua Kota
                </button>

                {filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      className={`city-dropdown-option ${selectedCity === city ? "active" : ""}`}
                      onClick={() => handleCitySelect(city)}
                    >
                      {city}
                    </button>
                  ))
                ) : (
                  <div className="city-dropdown-empty">
                    Kota tidak ditemukan
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="filter-group">
          <p className="results-count">
            {loading ? "Memuat..." : `${umkmsCount} UMKM ditemukan`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
