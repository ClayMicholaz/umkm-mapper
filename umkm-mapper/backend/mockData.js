// Mock UMKM data untuk development
const mockUMKMs = [
  {
    _id: "1",
    name: "Warung Makan Sederhana",
    category: "FnB",
    description: "Restoran masakan tradisional Indonesia",
    location: {
      type: "Point",
      coordinates: [106.827, -6.1753], // Jakarta
    },
    address: "Jl. Merdeka No. 123",
    city: "Jakarta",
    province: "DKI Jakarta",
    phone: "021-1234567",
    whatsapp: "628123456789",
    website: "https://warungmakan.com",
    owner: "Ibu Siti",
    rating: 4.5,
    reviews: 128,
  },
  {
    _id: "2",
    name: "Bengkel Mobil Jaya",
    category: "Otomotif",
    description: "Bengkel servis dan perbaikan mobil profesional",
    location: {
      type: "Point",
      coordinates: [106.836, -6.185],
    },
    address: "Jl. Sudirman No. 456",
    city: "Jakarta",
    province: "DKI Jakarta",
    phone: "021-9876543",
    whatsapp: "628987654321",
    website: "https://bengkeljaya.com",
    owner: "Pak Hendra",
    rating: 4.8,
    reviews: 256,
  },
  {
    _id: "3",
    name: "Toko Elektronik Maju",
    category: "Teknologi",
    description: "Toko penjualan dan service elektronik",
    location: {
      type: "Point",
      coordinates: [106.818, -6.165],
    },
    address: "Jl. Ahmad Yani No. 789",
    city: "Jakarta",
    province: "DKI Jakarta",
    phone: "021-5555555",
    whatsapp: "628555555555",
    website: "https://tokoelektronik.com",
    owner: "Budi Santoso",
    rating: 4.3,
    reviews: 89,
  },
  {
    _id: "4",
    name: "Toko Fashion Cantik",
    category: "Fashion",
    description: "Toko fashion dan pakaian modern",
    location: {
      type: "Point",
      coordinates: [112.7515, -7.2575], // Surabaya
    },
    address: "Jl. Diponegoro No. 100",
    city: "Surabaya",
    province: "Jawa Timur",
    phone: "031-1234567",
    whatsapp: "628912345678",
    website: "https://fashioncantik.com",
    owner: "Nina Putri",
    rating: 4.6,
    reviews: 145,
  },
  {
    _id: "5",
    name: "Kerajinan Batik Nusantara",
    category: "Kerajinan",
    description: "Pengrajin batik tradisional Indonesia",
    location: {
      type: "Point",
      coordinates: [110.4064, -7.5505], // Yogyakarta
    },
    address: "Jl. Malioboro No. 999",
    city: "Yogyakarta",
    province: "DI Yogyakarta",
    phone: "0274-1234567",
    whatsapp: "6281234567890",
    website: "https://batiknusantara.com",
    owner: "Slamet Riyanto",
    rating: 4.9,
    reviews: 312,
  },
];

// Filter mock data
function filterMockData(category, city, search) {
  let filtered = mockUMKMs;

  if (category && category !== "Semua") {
    filtered = filtered.filter((u) => u.category === category);
  }
  if (city) {
    filtered = filtered.filter((u) =>
      u.city.toLowerCase().includes(city.toLowerCase()),
    );
  }
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (u) =>
        u.name.toLowerCase().includes(searchLower) ||
        u.description.toLowerCase().includes(searchLower),
    );
  }

  return filtered;
}

export { mockUMKMs, filterMockData };
