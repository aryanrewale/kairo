@echo off
echo ========================================
echo   KAIRO Full System Startup
echo ========================================

echo [1/4] Installing dependencies...
cd server
if not exist node_modules (
    echo Installing server dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Failed to install server dependencies!
        pause
        exit /b 1
    )
)

cd ..\client
if not exist node_modules (
    echo Installing client dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo Failed to install client dependencies!
        pause
        exit /b 1
    )
)

echo [2/4] Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath=C:\data\db || echo MongoDB already running"
timeout /t 3 /nobreak >nul

echo [3/4] Starting Backend Server...
cd ..\server
start "Backend" cmd /k "echo Starting Backend on port 5005... && npm start"
timeout /t 5 /nobreak >nul

echo [4/4] Starting Frontend...
cd ..\client
start "Frontend" cmd /k "echo Starting Frontend on port 3000... && npm run dev"

echo.
echo ========================================
echo   System Starting...
echo ========================================
echo.
echo Waiting for servers to start...
timeout /t 10 /nobreak >nul

echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5005/api/health
echo.
echo You can now register and login normally!
pause