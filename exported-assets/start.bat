@echo off
echo Starting KAIRO Application...
echo.

echo Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo ✅ MongoDB is running
) else (
    echo ❌ MongoDB is not running. Please start MongoDB first.
    echo Run: mongod
    pause
    exit /b 1
)

echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd server && npm run dev"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo.
echo Starting frontend server...
start "Frontend Server" cmd /k "cd client && npm run dev"

echo.
echo ✅ Both servers are starting...
echo Backend: http://localhost:5003
echo Frontend: http://localhost:3000
echo Test API: http://localhost:3000/test
echo.
pause