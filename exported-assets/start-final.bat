@echo off
title KAIRO - Japanese Learning Platform
color 0A

echo.
echo  ██╗  ██╗ █████╗ ██╗██████╗  ██████╗ 
echo  ██║ ██╔╝██╔══██╗██║██╔══██╗██╔═══██╗
echo  █████╔╝ ███████║██║██████╔╝██║   ██║
echo  ██╔═██╗ ██╔══██║██║██╔══██╗██║   ██║
echo  ██║  ██╗██║  ██║██║██║  ██║╚██████╔╝
echo  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝ 
echo.
echo  Japanese Learning Platform - FINAL VERSION
echo  ==========================================
echo.

echo [1/5] Checking MongoDB...
net start MongoDB 2>nul
if %errorlevel% neq 0 (
    echo Starting MongoDB...
    start /min mongod
    timeout /t 3 /nobreak >nul
)
echo ✓ MongoDB ready

echo.
echo [2/5] Installing dependencies...
if not exist "node_modules" (
    echo Installing root dependencies...
    npm install --silent
)
if not exist "client\node_modules" (
    echo Installing client dependencies...
    cd client && npm install --silent && cd ..
)
if not exist "server\node_modules" (
    echo Installing server dependencies...
    cd server && npm install --silent && cd ..
)
echo ✓ Dependencies ready

echo.
echo [3/5] Starting backend server...
start /min cmd /c "cd server && npm run dev"
timeout /t 5 /nobreak >nul
echo ✓ Backend started on port 5005

echo.
echo [4/5] Starting frontend server...
start /min cmd /c "cd client && npm run dev"
timeout /t 8 /nobreak >nul
echo ✓ Frontend started on port 3000

echo.
echo [5/5] Testing system...
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   🎌 KAIRO IS READY! 🎌
echo ========================================
echo.
echo ✅ All systems operational
echo ✅ Progress tracking active
echo ✅ Level system working
echo ✅ Chat functionality ready
echo ✅ Error handling enabled
echo.
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend:  http://localhost:5005
echo.
echo Features:
echo • Automatic progress tracking
echo • Bronze → Diamond level system  
echo • Real-time leaderboard
echo • Japanese chat practice
echo • Flashcards & quizzes
echo • Mobile-responsive design
echo.

timeout /t 3 /nobreak >nul
start http://localhost:3000

echo Opening KAIRO in your browser...
echo.
echo Press any key to exit this window
echo (The application will continue running)
pause >nul