@echo off
echo ========================================
echo   KAIRO Backend Quick Start
echo ========================================

echo [1/3] Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath=C:\data\db 2>nul || echo MongoDB running"

echo [2/3] Starting Backend...
cd server
start "Backend" cmd /k "npm install && npm start"

echo [3/3] Starting Frontend...
cd ..\client  
start "Frontend" cmd /k "npm run dev"

echo.
echo Backend: http://localhost:5005
echo Frontend: http://localhost:3000
echo.
echo Login: demo@kairo.com / demo123
pause