@echo off
echo Clearing browser cache and starting fresh...

echo Killing any running processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npm.exe 2>nul

echo Starting frontend only...
cd client
start "KAIRO Frontend" cmd /k "npm run dev"

echo.
echo ✅ Frontend starting...
echo Open: http://localhost:3000
echo.
pause