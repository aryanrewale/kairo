@echo off
echo ========================================
echo   KAIRO Login Fix - Offline Mode
echo ========================================

echo Starting Frontend Only (Offline Mode)...
cd client
start "KAIRO-Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   KAIRO Ready - Offline Mode
echo ========================================
echo.
echo Open: http://localhost:3000
echo.
echo DEMO LOGIN (Works Offline):
echo Email:    demo@kairo.com
echo Password: demo123
echo.
echo This will work without backend server!
echo.
pause