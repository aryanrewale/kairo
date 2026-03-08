@echo off
echo ========================================
echo   KAIRO - Japanese Learning Platform
echo   Starting with NEW LEVEL SYSTEM!
echo ========================================
echo.
echo Features Added:
echo - Bronze, Silver, Gold, Platinum, Diamond stages
echo - XP system with level progression
echo - Achievement system
echo - Leaderboard with social competition
echo - Level badges in navbar and dashboard
echo.
echo Starting servers...
echo.

cd /d "%~dp0"

echo Starting MongoDB (if not running)...
start /min mongod 2>nul

echo Waiting for MongoDB to start...
timeout /t 3 /nobreak >nul

echo Starting backend server...
start /min cmd /c "cd server && npm start"

echo Waiting for backend to initialize...
timeout /t 5 /nobreak >nul

echo Starting frontend development server...
start /min cmd /c "cd client && npm run dev"

echo.
echo ========================================
echo   Servers are starting up!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo Level System Features:
echo - View your level badge in the navbar
echo - Check leaderboard on dashboard
echo - Earn XP from quizzes and flashcards
echo - Unlock achievements as you progress
echo.
echo Press any key to open the website...
pause >nul

start http://localhost:3000

echo.
echo Website opened! Happy learning!
echo Press any key to exit...
pause >nul