@echo off
echo ========================================
echo           STARTING KAIRO WEBSITE
echo ========================================

echo.
echo [1/2] Starting Backend Server...
echo.
start "Kairo Backend" cmd /k "cd /d %~dp0server && npm start"

timeout /t 3 /nobreak >nul

echo.
echo [2/2] Starting Frontend...
echo.
start "Kairo Frontend" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo ✅ Website is starting up!
echo ✅ Backend: http://localhost:5005
echo ✅ Frontend: http://localhost:3000
echo.
echo Wait a few seconds then open: http://localhost:3000
echo.
pause