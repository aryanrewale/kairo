@echo off
echo ========================================
echo   KAIRO - Japanese Learning Platform
echo   OPTIMIZED STARTUP
echo ========================================
echo.
echo Starting MongoDB...
start /min mongod 2>nul

echo Waiting for MongoDB...
timeout /t 3 /nobreak >nul

echo Starting backend server...
start /min cmd /c "cd server && npm run dev"

echo Waiting for backend...
timeout /t 5 /nobreak >nul

echo Starting frontend...
start /min cmd /c "cd client && npm run dev"

echo.
echo ========================================
echo   All services started!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5005
echo.
echo Features:
echo - Automatic progress tracking
echo - Level system (Bronze to Diamond)
echo - Real-time leaderboard
echo - Error handling & recovery
echo.
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo Press any key to exit...
pause >nul