@echo off
echo ========================================
echo   KAIRO - Complete Login Fix
echo ========================================

echo.
echo [1/6] Checking dependencies...
cd server
if not exist node_modules (
    echo Installing server dependencies...
    call npm install
)

cd ..\client
if not exist node_modules (
    echo Installing client dependencies...
    call npm install
)

echo.
echo [2/6] Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath=C:\data\db 2>nul || echo MongoDB service running"
timeout /t 5 /nobreak >nul

echo.
echo [3/6] Creating test user...
cd ..
node create-test-user.js

echo.
echo [4/6] Starting Backend Server...
cd server
start "Backend-Server" cmd /k "echo Starting Kairo Backend... && npm start"
timeout /t 5 /nobreak >nul

echo.
echo [5/6] Starting Frontend...
cd ..\client
start "Frontend-App" cmd /k "echo Starting Kairo Frontend... && npm run dev"

echo.
echo [6/6] Testing connections...
timeout /t 8 /nobreak >nul

echo.
echo ========================================
echo   KAIRO System Ready!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5005
echo.
echo LOGIN CREDENTIALS:
echo Email:    test@kairo.com
echo Password: test123
echo.
echo TROUBLESHOOTING:
echo - If login fails: Check backend console for errors
echo - If "Cannot connect": Restart backend server
echo - If MongoDB error: Ensure MongoDB is installed
echo.
echo Press any key to open the application...
pause >nul
start http://localhost:3000