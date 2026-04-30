# UMKM Mapper - Development Guide

## Getting Started

### 1. Initial Setup

Run the setup script for your OS:

**macOS/Linux:**

```bash
chmod +x setup.sh
./setup.sh
```

**Windows:**

```bash
setup.bat
```

This will:

- Install all dependencies
- Create .env files from examples
- Set up the project structure

### 2. Configure MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist your IP (or 0.0.0.0/0 for development)
5. Get connection string
6. Update `backend/.env` with connection string

Example format:

```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/umkm-mapper?retryWrites=true&w=majority
```

### 3. Start Development

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

The app will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- API Health: http://localhost:5000/api/health

### 4. Verify Atlas Connection

If you want to confirm Atlas access before seeding or testing data:

```bash
cd backend
node test-connection.js
```

## Development Workflow

### Adding Sample Data

You can add UMKM data programmatically:

```javascript
// Example: POST to http://localhost:5000/api/umkm
const sampleUMKM = {
  name: "Warung Makan Sejahtera",
  category: "FnB",
  description: "Restoran masakan tradisional",
  location: {
    type: "Point",
    coordinates: [106.827, -6.1753], // [longitude, latitude]
  },
  address: "Jl. Merdeka No. 123",
  city: "Jakarta",
  province: "DKI Jakarta",
  phone: "021-1234567",
  whatsapp: "628123456789",
  website: "https://warungmakan.com",
  owner: "Ibu Siti",
};
```

### API Testing

Use Postman or curl to test endpoints:

```bash
# Get all UMKM
curl http://localhost:5000/api/umkm

# Get by category
curl "http://localhost:5000/api/umkm?category=FnB"

# Get categories
curl http://localhost:5000/api/umkm/categories

# Get health check
curl http://localhost:5000/api/health
```

## Project Structure Explained

```
umkm-mapper/
├── api/
│   └── [...all].js             # Vercel serverless API entrypoint
│
├── backend/
│   ├── lib/
│   │   └── db.js               # MongoDB connection helper (cached)
│   ├── controllers/
│   │   └── umkmController.js   # API handlers
│   ├── models/
│   │   └── UMKM.js             # MongoDB schema
│   ├── routes/
│   │   └── umkmRoutes.js       # API endpoints
│   ├── app.js                  # Shared Express app (server + serverless)
│   ├── mockData.js             # Mock UMKM records
│   ├── seed.js                 # Seed script for Atlas
│   ├── server.js               # Express server entry
│   └── test-connection.js      # Atlas connection check
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Map.jsx
│   │   │   ├── Map.css
│   │   │   ├── MapHeader.jsx
│   │   │   ├── MapHeader.css
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   └── services/
│   │       └── umkmService.js
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── DEVELOPMENT.md
├── README.md
├── render.yaml
├── setup.bat
├── setup.sh
└── vercel.json
```

## Common Issues

### "MongoDB connection failed"

- Check your connection string in .env
- Ensure IP is whitelisted on Atlas
- Check database user credentials

### "API not responding"

- Ensure backend is running on port 5000
- Check CORS settings in server.js
- Verify .env files are configured

### "Map not showing"

- Check browser console for errors
- Verify Leaflet CSS is loaded
- Check API responses in Network tab

## Building for Production

### Backend (Render)

```bash
cd backend
npm start  # or npm run dev for production with nodemon
```

### Frontend (Vercel)

```bash
cd frontend
npm run build  # Creates dist folder
```

## Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user and connection string ready
- [ ] GitHub repo created and code pushed
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Vercel
- [ ] Environment variables configured on both platforms
- [ ] CORS settings updated for production domains
- [ ] Sample UMKM data loaded into database
- [ ] Test all features on production

## Useful Commands

```bash
# Backend
cd backend
npm run dev        # Start with nodemon
npm start          # Start server
npm install        # Install dependencies

# Frontend
cd frontend
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build

# Root
npm install        # Install workspace dependencies
```

## Resources

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [Leaflet Documentation](https://leafletjs.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Render Deployment](https://render.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## Next Steps

1. Add sample data from Kaggle
2. Implement user authentication
3. Create admin dashboard
4. Add review/rating system
5. Deploy to production
6. Monitor and optimize

Happy coding! 🚀
