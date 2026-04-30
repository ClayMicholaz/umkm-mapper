# UMKM Location Mapper - Development Instructions

## Project Setup
- Frontend: React with Leaflet, deployed on Vercel
- Backend: Express.js with MongoDB, deployed on Render
- Database: MongoDB Atlas (free tier)

## Development Steps
1. Setup backend with Express.js, MongoDB connection
2. Setup React frontend with Leaflet integration
3. Create MongoDB GeoJSON models for UMKM locations
4. Implement API routes for location queries and filtering
5. Create React components for map, filters, and markers
6. Add environment configuration for all three services
7. Setup deployment configurations

## Key Dependencies
- Backend: express, mongoose, cors, dotenv, axios
- Frontend: react, leaflet, axios, react-leaflet
- Database: MongoDB Atlas with geospatial indexing

## Deployment
- Vercel: Frontend (auto-deploy from Git)
- Render: Backend (auto-deploy from Git)
- MongoDB Atlas: Database connection string in .env
