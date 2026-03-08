@echo off
echo Killing all Node processes...
taskkill /F /IM node.exe 2>nul
taskkill /F /IM npm.exe 2>nul
taskkill /F /IM nodemon.exe 2>nul

echo Waiting 2 seconds...
timeout /t 2 /nobreak >nul

echo Building frontend...
cd client
call npm run build

echo Starting server on port 5004...
cd ..\server
npm run dev