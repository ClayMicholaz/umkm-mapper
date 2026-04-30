@echo off
REM Setup script for Windows

echo 🚀 Setting up UMKM Mapper Project...

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
copy .env.example .env
echo ✓ Backend setup complete. Update .env with MongoDB Atlas connection string

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ..\frontend
call npm install
copy .env.example .env
echo ✓ Frontend setup complete

echo.
echo ✅ Setup complete!
echo.
echo 📝 Next steps:
echo 1. Update backend\.env with your MongoDB Atlas connection string
echo 2. Update frontend\.env with your API URL (if needed)
echo.
echo 🚀 To start development:
echo    Terminal 1: cd backend ^&^& npm run dev
echo    Terminal 2: cd frontend ^&^& npm run dev
echo.
echo 📚 For deployment instructions, see README.md
