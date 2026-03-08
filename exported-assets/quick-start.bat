@echo off
echo ========================================
echo         KAIRO QUICK START
echo ========================================

echo Killing any existing processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npm.exe 2>nul

echo Building frontend...
cd client
call npm run build

echo Starting server...
cd ..\server
echo.
echo ✅ KAIRO running at: http://localhost:5004
echo.
npm run dev