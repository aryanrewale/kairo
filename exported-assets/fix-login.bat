@echo off
echo ========================================
echo   KAIRO Login Fix & Quick Start
echo ========================================

echo.
echo [1/4] Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath=C:\data\db 2>nul || echo MongoDB already running"
timeout /t 3 /nobreak >nul

echo.
echo [2/4] Creating test user...
node create-test-user.js

echo.
echo [3/4] Starting Backend Server...
cd server
start "Backend" cmd /k "npm start"
timeout /t 3 /nobreak >nul

echo.
echo [4/4] Starting Frontend...
cd ..\client
start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   KAIRO System Started!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5005
echo.
echo TEST LOGIN CREDENTIALS:
echo Email:    test@kairo.com
echo Password: test123
echo.
echo If login still fails, check:
echo 1. MongoDB is running
echo 2. Backend server started successfully
echo 3. No port conflicts (5005, 3000)
echo.
pause