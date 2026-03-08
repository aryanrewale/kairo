@echo off
echo ========================================
echo   KAIRO AI Chat Setup & Start
echo ========================================

echo.
echo [1/4] Installing OpenAI dependency...
cd server
call npm install openai
if %errorlevel% neq 0 (
    echo Error installing OpenAI dependency!
    pause
    exit /b 1
)

echo.
echo [2/4] Starting MongoDB...
start "MongoDB" cmd /k "mongod --dbpath=C:\data\db 2>nul || echo MongoDB already running or using cloud DB"

echo.
echo [3/4] Starting Backend Server...
start "Backend" cmd /k "npm start"

echo.
echo [4/4] Starting Frontend...
cd ..\client
start "Frontend" cmd /k "npm run dev"

echo.
echo ========================================
echo   KAIRO AI Chat System Started!
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5005
echo.
echo To enable AI chat:
echo 1. Get OpenAI API key from: https://platform.openai.com/account/api-keys
echo 2. Add to server/.env: OPENAI_API_KEY=your-key-here
echo 3. Restart the backend server
echo.
echo Without API key: Uses simple response mode
echo With API key: Full AI chatbot functionality
echo.
pause