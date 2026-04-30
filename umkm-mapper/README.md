# 📍 UMKM Mapper Indonesia

A web application that displays UMKM (Small-Medium Enterprise) locations across Indonesia on an interactive map. Built with MERN stack (MongoDB, Express, React, Node.js) and deployed on Render, Vercel, and MongoDB Atlas.

## 🌟 Features

- **Interactive Map**: Leaflet-based map displaying UMKM locations across Indonesia
- **Category Filtering**: Filter UMKM by categories (FnB, Otomotif, Teknologi, Fashion, Kerajinan, Pertanian, Jasa, Retail, dll)
- **Search Functionality**: Search by UMKM name, product, or service
- **Location-based Search**: Find UMKM by city
- **UMKM Details**: View contact information, address, website, and ratings
- **Responsive Design**: Mobile-friendly interface

## 📋 Technology Stack

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **Leaflet** - Interactive maps
- **Axios** - HTTP client
- **CSS3** - Styling

### Backend

- **Node.js & Express** - Server framework
- **MongoDB** - Database with GeoJSON support
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Deployment

- **Frontend**: Vercel (auto-deploy from Git)
- **Backend**: Render (auto-deploy from Git)
- **Database**: MongoDB Atlas (free tier)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB Atlas account (free tier available)
- Git

### Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd umkm-mapper
```

2. **Setup Backend**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string
npm run dev
```

3. **Setup Frontend** (in another terminal)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The frontend will be available at `http://localhost:3000` and backend at `http://localhost:5000`

## 📚 API Documentation

### Endpoints

#### Get All UMKM

```
GET /api/umkm?category=FnB&city=Jakarta&search=restoran
```

#### Get UMKM by ID

```
GET /api/umkm/:id
```

#### Get Nearby UMKM

```
GET /api/umkm/nearby?longitude=113.9213&latitude=-2.5489&maxDistance=50000&category=FnB
```

#### Get Categories

```
GET /api/umkm/categories
```

#### Get Cities

```
GET /api/umkm/cities
```

#### Create UMKM (Admin)

```
POST /api/umkm
```

#### Update UMKM (Admin)

```
PUT /api/umkm/:id
```

#### Delete UMKM (Admin)

```
DELETE /api/umkm/:id
```

## 🗄️ Database Schema

### UMKM Model

```javascript
{
  name: String,
  category: String (enum),
  description: String,
  location: GeoJSON Point,
  address: String,
  city: String,
  province: String,
  phone: String,
  whatsapp: String,
  website: String,
  email: String,
  owner: String,
  rating: Number (0-5),
  reviews: Number,
  imageUrl: String,
  hours: { open: String, close: String },
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Environment Variables

### Backend (.env)

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/umkm-mapper
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000/api
```

## 📦 Project Structure

```
umkm-mapper/
├── api/
│   └── [...all].js
├── backend/
│   ├── lib/
│   │   └── db.js
│   ├── models/
│   │   └── UMKM.js
│   ├── routes/
│   │   └── umkmRoutes.js
│   ├── controllers/
│   │   └── umkmController.js
│   ├── app.js
│   ├── mockData.js
│   ├── seed.js
│   ├── server.js
│   ├── test-connection.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Map.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── MapHeader.jsx
│   │   ├── services/
│   │   │   └── umkmService.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
├── DEVELOPMENT.md
├── README.md
├── render.yaml
├── setup.bat
├── setup.sh
├── vercel.json
├── .github/
│   └── copilot-instructions.md
└── package.json
```

## 🚢 Deployment

### Vercel (Frontend)

1. Push code to GitHub
2. Connect your GitHub repo to Vercel
3. Add environment variable `VITE_API_URL` pointing to your Render backend
4. Deploy

### Render (Backend)

1. Push code to GitHub
2. Create new Web Service on Render
3. Connect your GitHub repo
4. Add environment variables (MONGODB_URI, etc.)
5. Deploy

### MongoDB Atlas (Database)

1. Create free cluster on MongoDB Atlas
2. Create database user
3. Whitelist IP address
4. Get connection string
5. Add to backend .env as MONGODB_URI

## 📊 Sample Data

To populate sample data, you can:

1. Download dummy data from Kaggle UMKM datasets
2. Use the POST /api/umkm endpoint to add data
3. Or directly import CSV/JSON into MongoDB

Format your data to match the UMKM schema with proper GeoJSON coordinates.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 📞 Support

For issues and questions, please open an issue in the GitHub repository.

## 🎯 Roadmap

- [ ] User authentication
- [ ] Review and rating system
- [ ] Admin dashboard
- [ ] Advanced filtering
- [ ] Geolocation-based searches
- [ ] Social sharing features
- [ ] Mobile app (React Native)

---

**Happy mapping! 🗺️**
