@echo off
echo ========================================
echo   KAIRO Simple Start (Fixed)
echo ========================================

echo [1/3] Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath=C:\data\db || echo MongoDB running"
timeout /t 3 /nobreak >nul

echo [2/3] Starting Backend (Fixed)...
cd server
start "Backend" cmd /k "node index.js"
timeout /t 3 /nobreak >nul

echo [3/3] Starting Frontend...
cd ..\client
start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   KAIRO Ready!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5005
echo.
echo Register and login normally!
pause